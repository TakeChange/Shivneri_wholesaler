import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Image, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Delete from 'react-native-vector-icons/Entypo';
import Dec from '../components/Dec';
import Inc from '../components/Inc';
import { useSelector, useDispatch } from 'react-redux';
import { addToBill, removeFromBill, updateItemQuantity } from '../redux_toolkit/Bill_list/billSlice';
import ProductModal from '../components/ProductModel';
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';
import ConfirmationModal from '../components/ConfirmationModel';
const BillScreen = ({ navigation, route }) => {
    const customer = useSelector(state => state.customer);
    //console.log("customer data", customer)
    const dispatch = useDispatch();
    const billItems = useSelector(state => state.bill.items);
    //console.log(billItems)
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [productModalVisible, setProductModalVisible] = useState(false);
    const [productModalVisible1, setProductModalVisible1] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

    useEffect(() => {
        calculateTotal();
    }, [billItems]);

    useEffect(() => {
        if (!productModalVisible) {
            setSearch('');
            setData([]);
        }
    }, [productModalVisible]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://demo.raviscyber.in/public/category_wise_productList.php');
                const json = await response.json();
                setProducts(json);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = text => {
        setSearch(text);
        if (text.trim() === '') {
            setData([]);
        } else {
            const filtered = products.filter(item =>
                item.product_name_eng.toLowerCase().includes(text.toLowerCase())
            );
            setData(filtered);
        }
    };

    const renderItem1 = ({ item }) => {
        if (!item || !item.product_name_eng) {
            return null;
        }
        return (
            <TouchableOpacity onPress={() => handleItemClick(item)}>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '700', marginVertical: 12 }}>
                        {item.product_name_eng}
                    </Text>
                    <View style={styles.separator} />
                </View>
            </TouchableOpacity>
        );
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setProductModalVisible(false);
        setProductModalVisible1(true);
    };

    const handleCloseProductModal = () => {
        setProductModalVisible1(false);
        setSelectedItem(null);
    };
    const clearSearch = () => {
        setSearch('');
        setData([]);
    };

    const calculateTotal = () => {
        let total = 0;
        billItems.forEach(item => {
            total += parseFloat(item.total);
        });
        setTotalAmount(total);
    };

    const handleClick1 = (index) => {
        const item = billItems[index];
        const newQuantity = parseInt(item.quantity, 10) + 1;
        dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    };

    const handleClick2 = (index) => {
        const item = billItems[index];
        const newQuantity = Math.max(parseInt(item.quantity, 10) - 1, 1);
        dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    };

    const handleRemoveItem = (item) => {
        dispatch(removeFromBill(item.id));
    };

    const Product = ({ item, index }) => {
        const [total, setTotal] = useState(parseFloat(item.total).toFixed(2));

        useEffect(() => {
            setTotal(parseFloat(item.quantity * item.perPrice).toFixed(2));
        }, [item.quantity, item.perPrice]);

        const [bgColor, setBgColor] = useState('#23AA49');

        const handlePress = () => {
            setBgColor(!bgColor); // Toggle the color state on press
        };
        return (
            <View style={styles.BillList}>
                <TouchableOpacity style={[styles.head, { backgroundColor: bgColor ? '#23AA49' : 'red' }]}
                    onPress={handlePress}
                >
                    <Text style={styles.productNameText}>Product : {item.product_name}</Text>
                    <TouchableOpacity style={styles.flatdeleteicon} onPress={() => dispatch(removeFromBill(item.id))}>
                        <Delete name='cross' size={25} color='black' />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: item.product_image || 'https://via.placeholder.com/150' }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailText}>Type: {item.selectedUnitType}</Text>
                        <Text style={styles.detailText}>Price: ₹{item.perPrice}/-</Text>
                        <Text style={styles.detailText}>Total: ₹{total}/-</Text>

                        <View style={styles.IncDcr}>
                            <Inc onPress1={() => handleClick1(index)} />
                            <View style={styles.quantityContainer}>
                                <Text style={styles.detailText}>{item.quantity}</Text>
                            </View>
                            <Dec onPress2={() => handleClick2(index)} />
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    ////////////////////////////////////////////
    // const downloadpdf = async () => {
    //     if (billItems.length === 0) {
    //         console.error('No items to send.');
    //         return;
    //     }

    //     const billData = {
    //         customer_id: customer.customerId || null,
    //         product_name: billItems.map(item => item.product_name).join(", "),
    //         price: billItems.map(item => item.perPrice).join(", "),
    //         total: totalAmount ? totalAmount.toFixed(2) : null,
    //         quantity: billItems.map(item => item.quantity).join(", "),
    //         all_product_total: totalAmount ? totalAmount.toFixed(2) : null,
    //         created_at: new Date().toISOString(),
    //     };


    //     console.log("Sent Data is:", billData);

    //     try {
    //         const response = await fetch('https://demo.raviscyber.in/public/bill_list.php', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(billData), // Change from `billItems` to `billData`
    //         });

    //         const result = await response.json();
    //         console.log('Bill submitted successfully:', result);

    //         if (response.ok) {
    //             const rawResponse = await response.text();
    //             console.log('Raw response:', rawResponse);

    //             const result = await response.json();
    //             console.log('Bill submitted successfully:', result);

    //             if (result.status !== 'success') {
    //                 console.error('Failed to submit bill:', result.message);
    //             }
    //         } else {
    //             console.error('Response error:', response.status, response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error submitting bill:', error);
    //     }
    // };


    /////////////// This code is for pdf //////////////////

    const viewShotRef = useRef();
    const billDetails = billItems.map(item => ({
        id: item.id,
        product: item.product_name,
        Quantity: item.quantity,
        unit: item.selectedUnitType,
        perprice: item.perPrice,
        total: (item.quantity * item.perPrice).toFixed(2),
    }));

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

    const print = async () => {

        const customerName = customer.customerName;
        const billDate = new Date().toISOString().split('T')[0];

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
                  <td colspan="4" style="text-align: right; font-weight: bold;">Total Amount</td>
                  <td colspan="2" style="font-weight: bold;text-align: right">${billDetails.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2)}</td> 
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
    }


    //////////////////////////////////////


      const handleOrderNow = () => {
        setConfirmationModalVisible(true);
    };

    const handleConfirm = async () => {
        setConfirmationModalVisible(false);
        await print();
    };

    const handleCancel = () => {
        setConfirmationModalVisible(false);
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen')}>
                    <Icon name="arrow-back" size={25} color="black" />
                </TouchableOpacity>

                <Text style={styles.headerText}>Bill</Text>
                <TouchableOpacity onPress={() => setProductModalVisible(true)}>
                    <Icon name="search" size={25} color="black" />
                </TouchableOpacity>
            </View>

            {billItems.length > 0 && (
                <>
                    <View style={styles.custnameview}>
                        <Text style={styles.custtext}>Customer name : {customer.customerName}</Text>
                    </View>
                    <View style={styles.penview}>
                        <Text style={styles.pendingText}>Pending:000000</Text>
                    </View>
                </>
            )}
            <FlatList
                key={Date.now()}
                data={billItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Product item={item} index={index} />}
            />
            {billItems.length > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total : ₹{totalAmount}/-</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={handleOrderNow}>
                        <Text style={styles.text}>Order Now</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* first Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={productModalVisible}
                onRequestClose={() => setProductModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.search}>
                            <TextInput
                                placeholder="Search Product Name"
                                placeholderTextColor={'#ccc'}
                                style={styles.searchInput}
                                onChangeText={handleSearch}
                                value={search}
                            />
                            {search.length > 0 && (
                                <TouchableOpacity onPress={clearSearch}>
                                    <Icon name="close" size={25} color="black" style={styles.clearIcon} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <FlatList
                            data={data.length > 0 ? data : products}
                            renderItem={renderItem1}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </Modal>
            {/* second modal */}
            <ProductModal
                selectedItem={selectedItem}
                modalVisible={productModalVisible1}
                setModalVisible={handleCloseProductModal}
                dispatch={dispatch}
                clearSelectedItem={() => setSelectedItem(null)}
            //iconColors={iconColors}
            />

            
            {/* Confirmation Modal */}
            <ConfirmationModal
                visible={confirmationModalVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message="Are you sure you want to print this bill?"
            />
        </View>

    );
};

export default BillScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  paddingHorizontal: 15,
        //paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        //paddingHorizontal: 15,
        padding: 10,
        height: 60,

    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    custnameview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    custtext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    penview: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    pendingText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 15,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginHorizontal: 10

    },
    searchIcon: {
        padding: 10,
    },
    searchInputContainer: {
        flex: 1,
    },
    searchInput: {
        paddingHorizontal: 10,
        color: 'black',
    },
    clearIcon: {
        marginHorizontal: 10,
    },
    BillList: {
        height: 180,
        marginVertical: 10,
        borderColor: '#23AA49',
        borderWidth: 1,
        marginHorizontal: 10
    },
    head: {

        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8,
    },
    productNameText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imageContainer: {
        height: '60%',
        flexDirection: 'row',
    },
    imageWrapper: {
        width: '55%',
        height: 138,
        backgroundColor: 'red',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    detailsContainer: {
        width: '50%',
        padding: 5,

    },
    detailText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 13,
        margin: 3
    },
    IncDcr: {
        flexDirection: 'row',
        borderColor: '#23AA49',
        borderWidth: 1.5,
        width: '85%',
        justifyContent: 'space-between',
        borderRadius: 60 / 2,
        height: '34%',
        top: 6
    },
    quantityContainer: {
        marginHorizontal: '6%',
    },
    totalText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    totalText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#23AA49',
        width: '50%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginLeft: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        // padding: 20,
        maxHeight: '60%',
        justifyContent: 'space-between'
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 1,
        width: '100%',
    },

    ///second model
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: '10%',
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 10,
        padding: 20,
        width: 350
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'grey',

    },
    product: {
        fontWeight: '500',
        fontSize: 18,
        color: 'black',
        marginTop: 20
    },
    avai: {
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    input: {
        height: 32,
        marginVertical: 10,
        padding: 5,
        width: '26%',
        borderBottomWidth: 1,
        color: 'black'
    },
    boxcontain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    types: {
        fontSize: 15,
        textAlign: 'left',
        paddingLeft: 10,
        color: '#000'
    },
    names: {
        fontSize: 15,
        paddingVertical: 5,
        color: '#000'
    },
    dropdown: {
        width: '40%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignSelf: 'center',
        color: 'black'
    },
    selectedTextStyle: {
        color: 'black',
        fontSize: 15,
    },
    placeholderStyle: {
        color: 'black',
        fontSize: 14,
    },
    itemTextStyle: {
        color: 'black',
        fontSize: 16,
        backgroundColor: 'white'
    },
    itemContainer: {
        // padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    list: {
        marginTop: 20,
        color: 'black',

    },
    doneButton: {
        backgroundColor: '#23AA29',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    doneButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#23AA29',
        padding: 15,
        borderRadius: 50,
    },
});
