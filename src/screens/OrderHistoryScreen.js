import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import axios from 'axios';
const OrderHistoryScreen = () => {
 var cust_data=[];
  const users = [
    {
      Customer: "Mangesh Lilake",
      Order: 34866,
      Total: 2532,

    },
    {
      Customer: "Cash Bill",
      Order: 34865,
      Total: 94
    },
    {
      Customer: "Cash Bill",
      Order: 34866,
      Total: 156
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 110
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 78
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 94
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 78
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 144
    }
  ];
  const [data,setData] = useState([]);
 const [loading,setLoading] = useState(false);
  useEffect(() =>{
    handleCustomerList();
  },[]);
   
    const handleCustomerList = async () => {
      setLoading(true);
   
      try {
        const loginUrl = 'https://demo.raviscyber.in/public/customer_payment_list.php';
   
        const response = await axios.post(loginUrl, {
          order_type: 1,
        },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
          setData(response);
          cust_data = response.data;
        // const { status, message } = response.data;
        console.log('res', cust_data);
        // console.log('responce 1', response[0]);


   
        // if (status === "success") {
        //   setSession();
        //   ToastAndroid.show(message, ToastAndroid.SHORT);
        //   navigation.navigate('DrawerNavigation');
        // } else {
        //   console.error('Login failed:', message);
        //   ToastAndroid.show(message, ToastAndroid.SHORT);
        // }
      } catch (error) {
        //ToastAndroid.show('Please enter valid username and password', ToastAndroid.SHORT);
        console.log("error:",error);
      } 
      finally {
        setLoading(false);
      }
    };
  
    const renderItem1 = ({ item }) => {
      return (
        <View style={styles.Container}>
        <View style={styles.flatstyle}>
          <Text style={styles.txt}>Customer Name: {item.cust_name}</Text>
          <Text style={styles.txt}>Order ID: {item.order_id}</Text>
          <Text style={styles.txt}>Total: ₹ {item.paid_amount}</Text>
          <Text style={styles.calender}>
            <FontAwesome name='calendar' size={16} color='#000000' />{item.date}</Text>
  
          <View style={styles.viewbill}>
            <Text style={styles.txt}>View Bill</Text>
            <TouchableOpacity>
            <Entypo name='eye' size={25} color='#000000' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      );
  };

  return (
    <View>
       {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={cust_data}
                    renderItem={renderItem1}
                    keyExtractor={item => item.product_id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />)}
    </View>
  );
};
// const UserData = (props) => {
//   const item = props.cust_data
//   console.log
 
//   return (
//     <View style={styles.Container}>
//       <View style={styles.flatstyle}>
//         <Text style={styles.txt}>Customer Name: {item.cust_name}</Text>
//         <Text style={styles.txt}>Order ID: {item.order_id}</Text>
//         <Text style={styles.txt}>Total: ₹ {item.paid_amount}</Text>
//         <Text style={styles.calender}>
//           <FontAwesome name='calendar' size={16} color='#000000' />{item.date}</Text>

//         <View style={styles.viewbill}>
//           <Text style={styles.txt}>View Bill</Text>
//           <TouchableOpacity>
//           <Entypo name='eye' size={25} color='#000000' />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>

//   )
// }

export default OrderHistoryScreen

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
  viewbill:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:'2%'
  }
})