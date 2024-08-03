import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Platform, PermissionsAndroid, Dimensions } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Icon from 'react-native-vector-icons/FontAwesome';
import Back from 'react-native-vector-icons/Ionicons';
const { height } = Dimensions.get('window');

const ShowBill = ({ navigation }) => {
  const viewShotRef = useRef();
  const billDetails = [
    {
      id: 1,
      product: 'monaco',
      Quantity: 10,
      unit: 'Box',
      perprice: 10,
      total: 100
    },
    {
      id: 1,
      product: 'monaco',
      Quantity: 10,
      unit: 'Box',
      perprice: 10,
      total: 100
    },
    {
      id: 1,
      product: 'monaco',
      Quantity: 10,
      unit: 'Box',
      perprice: 10,
      total: 100
    },
    {
      id: 1,
      product: 'monaco',
      Quantity: 10,
      unit: 'Box',
      perprice: 10,
      total: 100
    }
  ];

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download the PDF file',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Storage permission request error:', err);
        return false;
      }
    }
    return true;
  };

  const generatePDF = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Storage permission is required to save the PDF.');
      return;
    }
    const customerName = 'John Doe'; // Replace with actual name
    const paymentType = 'Credit Card'; // Replace with actual payment type
    const billDate = '2024-08-01'; // Replace with actual date

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; margin-top:80px}
            .details { margin-bottom: 20px; text-align: center;top:10 }
            .details p { margin: 5px 0; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .table th, .table td { border: 1px solid #000; padding: 8px; }
            .table th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Shivneri Wholsellar</h1>
          </div>
          <div class="details">
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Payment Type:</strong> ${paymentType}</p>
            <p><strong>Date:</strong> ${billDate}</p>
          </div>
          <table class="table">
            <tr>
              <th>Sr.no</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Per Unit Rate</th>
              <th>Total</th>
            </tr>
              ${billDetails.map((item, index) => `
              <tr style="text-align: center">
                <td>${index + 1}</td>
                <td>${item.product}</td>
                <td>${item.Quantity}</td>
                <td>${item.unit}</td>
                <td>${item.perprice}</td>
                <td>${item.total}</td>
              </tr>
            `).join('')}
                <tr style="background-color: #f0f0f0;">
                  <td colspan="4" style="text-align: right; font-weight: bold;">Sub Total</td>
                  <td colspan="2" style="font-weight: bold;text-align: right">${billDetails.reduce((total, item) => total + item.total, 0)}</td> 
                </tr>
                <tr style="background-color: #f0f0f0;">
                  <td colspan="4" style="text-align: right; font-weight: bold;">SurCharge Amount</td>
                  <td colspan="2" style="font-weight: bold;text-align: right">${billDetails.reduce((total, item) => total + item.total, 0)}</td> 
                </tr>
                <tr style="background-color: #f0f0f0;">
                  <td colspan="4" style="text-align: right; font-weight: bold;">Total Amount</td>
                  <td colspan="2" style="font-weight: bold;text-align: right">${billDetails.reduce((total, item) => total + item.total, 0)}</td> 
                </tr>
          </table>
        </body>
      </html>
    `;

    const options = {
      html,
      fileName: `Bill_${new Date().getTime()}`,
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF generated at:', file.filePath);
      Alert.alert('PDF Generated', `File path: ${file.filePath}`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  const itemsPerPage = 10;
  const pages = [];
  for (let i = 0; i < billDetails.length; i += itemsPerPage) {
    pages.push(billDetails.slice(i, i + itemsPerPage));
  }




  /////////code for printer

  const handlePrint = async () => {
    const customerName = 'John Doe'; // Replace with actual name
    const paymentType = 'Credit Card'; // Replace with actual payment type
    const billDate = '2024-08-01'; // Replace with actual date

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; margin-top:80px}
            .details { margin-bottom: 20px; text-align: center;top:10 }
            .details p { margin: 5px 0; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .table th, .table td { border: 1px solid #000; padding: 8px; }
            .table th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Shivneri Wholsellar</h1>
          </div>
          <div class="details">
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Payment Type:</strong> ${paymentType}</p>
            <p><strong>Date:</strong> ${billDate}</p>
          </div>
          <table class="table">
            <tr>
              <th>Sr.no</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Per Unit Rate</th>
              <th>Total</th>
            </tr>
              ${billDetails.map((item, index) => `
              <tr style="text-align: center">
                <td>${index + 1}</td>
                <td>${item.product}</td>
                <td>${item.Quantity}</td>
                <td>${item.unit}</td>
                <td>${item.perprice}</td>
                <td>${item.total}</td>
              </tr>
            `).join('')}
                <tr style="background-color: #f0f0f0;">
                  <td colspan="4" style="text-align: right; font-weight: bold;">Sub Total</td>
                  <td colspan="2" style="font-weight: bold;text-align: right">${billDetails.reduce((total, item) => total + item.total, 0)}</td> 
                </tr>
                <tr style="background-color: #f0f0f0;">
                  <td colspan="4" style="text-align: right; font-weight: bold;">SurCharge Amount</td>
                  <td colspan="2" style="font-weight: bold;text-align: right">${billDetails.reduce((total, item) => total + item.total, 0)}</td> 
                </tr>
                <tr style="background-color: #f0f0f0;">
                  <td colspan="4" style="text-align: right; font-weight: bold;">Total Amount</td>
                  <td colspan="2" style="font-weight: bold;text-align: right">${billDetails.reduce((total, item) => total + item.total, 0)}</td> 
                </tr>
          </table>
        </body>
      </html>
    `;

    try {
      await RNPrint.print({
        html,
      });
    } catch (error) {
      console.error('Error printing directly: ', error);
      Alert.alert('Error', 'Failed to print directly. Please check printer settings.');
    }
  };


  ///////////////////////


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('OrderHistoryVehicleScreen')}>
            <Back name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <Text style={styles.pdfTitle}>Bill PDF</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handlePrint}>
            <Icon name="print" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={generatePDF} style={styles.icon}>
            <Icon name="download" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.pagesContainer}>
        {pages.map((page, pageIndex) => (
          <View key={pageIndex} style={styles.page}>
            {pageIndex === 0 && (
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 40 }} >
                <Text style={{ color: 'black', fontWeight: '800', fontSize: 16 }}>customer name :</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'black', fontWeight: '600', fontSize: 13, }}>Payment type : cash</Text>

                  <Text style={{ color: 'black', fontWeight: '600', fontSize: 13, left: 20 }}>date:30/07/2024</Text>
                </View>
              </View>
            )}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Sr.no</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Product</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Quantity</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>unit</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Per Unit Rate</Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>Total</Text>
              </View>
              {page.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                  <Text style={styles.tableCell}>{item.product}</Text>
                  <Text style={styles.tableCell}>{item.Quantity}</Text>
                  <Text style={styles.tableCell}>{item.unit}</Text>
                  <Text style={styles.tableCell}>{item.perprice}</Text>
                  <Text style={styles.tableCell}>{item.total}</Text>
                </View>
              ))}
              {pageIndex === pages.length - 1 && (
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.tableHeader]}>Sub Total</Text>
                  {/* <Text style={[styles.tableCell, styles.tableHeader]}>
                    ${billDetails.reduce((total, item) => total + parseInt(item.price.substring(1)), 0)}
                  </Text> */}
                </View>
              )}

              {pageIndex === pages.length - 1 && (
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.tableHeader]}>Subcharge Amount</Text>
                  {/* <Text style={[styles.tableCell, styles.tableHeader]}>
                    ${billDetails.reduce((total, item) => total + parseInt(item.price.substring(1)), 0)}
                  </Text> */}
                </View>
              )}

              {pageIndex === pages.length - 1 && (
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.tableHeader]}>Total amount</Text>
                  {/* <Text style={[styles.tableCell, styles.tableHeader]}>
                    ${billDetails.reduce((total, item) => total + parseInt(item.price.substring(1)), 0)}
                  </Text> */}
                </View>
              )}
            </View>
            <Text style={styles.pageNumber}>Page {pageIndex + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#23AA49',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 30,
  },
  pagesContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  page: {
    width: '95%',
    height: height - 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  table: {
    width: '100%',
    marginBottom: 30,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#000',
    fontSize: 8
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 8,
    backgroundColor: '#f0f0f0',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ShowBill;
