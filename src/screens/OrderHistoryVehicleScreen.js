import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const OrderVehicleScreen = ({navigation}) => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    handleCustomerList();
  }, []);

  const handleCustomerList = async () => {
    try {
      const loginUrl = 'https://demo.raviscyber.in/public/customer_payment_list.php';
      const response = await axios.post(loginUrl, { order_type: 1 }, { headers: { "Content-Type": "multipart/form-data" } });
      // console.log('res', response);

      // Assuming your API response returns an array of customer objects with a 'cust_name' property
      setCustomerData(response.data); // Update state with API response data
    } catch (error) {
      console.log("error:", error);
    }
  };
  const UserData = (props) => {
    const item = props.data;
  
    return (
      <View style={styles.Container}>
        <View style={styles.flatstyle}>
          <Text style={styles.txt}>Customer Name: {item.cust_name}</Text>
          <Text style={styles.txt}>Order ID: {item.order_id}</Text>
          <Text style={styles.txt}>Total: ₹ {item.paid_amount}</Text>
          <Text style={styles.calender}>
            <FontAwesome name='calendar' size={16} color='#000000' /> {item.date}
          </Text>
  
          <View style={styles.viewbill}>
            <Text style={styles.txt}>View Bill</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('ShowBill')}>
              <Entypo name='eye' size={22} color='#000000' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={customerData} // Use customerData state here
        renderItem={({ item }) => <UserData data={item} />}
        keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
      />
    </View>
  );
};




export default OrderVehicleScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  calender: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  flatstyle: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  viewbill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '2%'
  }
});

