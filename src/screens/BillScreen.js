import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, FlatList, ScrollView } from 'react-native';
import LeftArrow from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import Delete from 'react-native-vector-icons/Entypo';
import Dec from '../components/Dec';
import Inc from '../components/Inc';
import axios from 'axios';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
const BillScreen = () => {
  const Product_list = useSelector((state) => state.product.data);
  console.log('Product_list:', Product_list);

  const [productList, setProductList] = useState([
    {
      id: 1,
      image: require('../../src/assets/logo.png'),
      name: 'soap ',
      type: 'dsfsdf',
      price: 210,
      counter: 1
    },
    {
      id: 2,
      image: require('../../src/assets/logo.png'),
      name: 'dishwasher',
      type: 'Bsdfsdf',
      price: 100,
      counter: 1
    },
    {
      id: 3,
      image: require('../../src/assets/logo.png'),
      name: 'dishwasher',
      type: 'Bsdfsdf',
      price: 500,
      counter: 1
    },
    {
      id: 4,
      image: require('../../src/assets/logo.png'),
      name: 'dishwasher',
      type: 'Bsdfsdf',
      price: 1100,
      counter: 1
    },
  ]);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(false);




  const handleSearch = text => {
    setSearch(text);
    if (text.trim() === '') {
      setData([]);
    } else {
      const filtered = Product_list.filter(item =>
        item.product_name_eng.toLowerCase().includes(text.toLowerCase())
      );
      setData(filtered);
    }
  };
  const renderItem1 = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(`${item.product_name_eng} `)}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{`${item.product_name_eng}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  const handleItemClick = itemName => {
    setSearch(itemName);
    handleSearch(itemName);

  };
  const clearSearch = () => {
    setSearch("");
    // setSelectedCustomerName("")
    // setSelectedCustomerMobile("")
    // setSelectedCustomerAddress("")
};

  const [totalAmount, setTotalAmount] = useState(0);
  const [key, setKey] = useState(Date.now()); // Unique key for FlatList re-render

  useEffect(() => {
    calculateTotal();
  }, []);

  useEffect(() => {
    setKey(Date.now());
  }, [productList]);

  const calculateTotal = () => {
    let total = 0;
    productList.forEach(item => {
      total += item.price * item.counter;
    });
    setTotalAmount(total);
  };

  const handleClick1 = (index) => {
    setProductList(prevList => {
      const newList = [...prevList];
      newList[index].counter++;
      return newList;
    });
    calculateTotal();
  };

  const handleClick2 = (index) => {
    setProductList(prevList => {
      const newList = [...prevList];
      if (newList[index].counter > 1) {
        newList[index].counter--;
      }
      return newList;
    });
    calculateTotal();
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const Product = ({ item, index }) => {
    const [total, setTotal] = useState(item.price * item.counter); // Initialize total with the product of price and counter

    const updateTotal = (counter) => {
      setTotal(item.price * counter); // Update total based on counter
    };

    const handleClick1 = () => {
      setProductList(prevList => {
        const newList = [...prevList];
        newList[index].counter++;
        return newList;
      });
      updateTotal(item.counter + 1); // Update total when incrementing
      calculateTotal(); // Recalculate the total amount
    };

    const handleClick2 = () => {
      setProductList(prevList => {
        const newList = [...prevList];
        if (newList[index].counter > 1) {
          newList[index].counter--;
        }
        return newList;
      });
      updateTotal(item.counter - 1); // Update total when decrementing
      calculateTotal(); // Recalculate the total amount
    };

    return (
      <View style={styles.flamainview}>
        <View style={styles.flatimageview}>
          <Image
            source={item.image}
            style={{ width: '100%', height: '100%' ,alignSelf:'center',}}
          />
        </View>
        <View style={styles.flatdataview}>
          <Text style={{ fontSize: 13, color: 'black', marginTop: '2%' }}>name: {item.name}</Text>
          <Text style={{ fontSize: 13, color: 'black', marginTop: '2%' }}>Type: {item.type}</Text>
          <Text style={{ fontSize: 13, color: 'black', marginTop: '2%' }}>Price: {item.price}/-</Text>
          <Text style={{ fontSize: 13, color: 'black', marginTop: '2%' }}>Total: {total}/-</Text>
        </View>
        <View style={styles.delidview}>
          <View style={styles.del}>
            <TouchableOpacity style={styles.flatdeleteicon}>
              <Delete
                name='cross'
                size={20}
                color='black'
              />
            </TouchableOpacity>
          </View>
          <View style={styles.id}>
            <Inc onPress1={handleClick1} />
            <View style={{ marginHorizontal: '10%' }}>
              <Text style={{ color: 'black' }}>{item.counter}</Text>
            </View>
            <Dec onPress2={handleClick2} />

          </View>
        </View>
      </View>
    )
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.custnameview}>

          <Text style={styles.custtext}>Customer name</Text>
        </View>
        <View style={styles.penview}>
        
          <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>Pending:000000</Text>
        </View>

   
        <View style={styles.search}>
          <Icon name="search" size={22} color="black" style={{ padding: 10 }} />
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Search Product Name"
              placeholderTextColor={'#ccc'}
              style={{ paddingHorizontal: 10, color: 'black' }}
              onChangeText={(text) => {
                setSearch(text);
                handleSearch(text);
              }}
              value={search}
            />
          </View>
          {search.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Icon name="close" size={25} color="black" style={{ marginHorizontal: 10 }} />
            </TouchableOpacity>
          )}
        </View>
        {search.trim() !== '' && (
          <FlatList
            data={data}
            renderItem={renderItem1}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
       
        <FlatList
          key={key} // Pass key to FlatList
          data={productList}
          keyExtractor={(item) => item.id.toString()} // Convert id to string
          renderItem={({ item, index }) => <Product item={item} index={index} />}
        />
        <View style={{ marginTop: '5%', alignItems: 'flex-end' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Total : {totalAmount}/-</Text>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default BillScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  //// header

  headtext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'flex-end',

  },

  ///customer name

  custnameview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginVertical: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  custtext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',

  },

  ////remaining & pending
  penview: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
   // alignItems: 'center'
  },
  //////Searchbar
  

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical:15,
    borderRadius:15
},
  ///flatlist
  flamainview: {
    height: 120,
    flexDirection: 'row',
    borderRadius: 20,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginVertical: 5
  },

  flatimageview: {
    backgroundColor:'red',
    width: '25%',
    height:'75%',
    alignSelf:'center',
    justifyContent:'center'

  },
  flatdataview: {
    backgroundColor: 'yellow',
    width: '50%',
    alignSelf:'center',
    paddingLeft:10
  },
  delidview: {
    flexDirection: 'column',
    backgroundColor: 'pink',
    width: '25%'
  },
  del: {
   // backgroundColor: 'orange',
    height: 80,
    alignItems: 'flex-end'
  },
  id: {
    backgroundColor: 'green',
    //height: '10%',
   width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatdeleteicon: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30 / 2,
    borderColor: '#ccc',
    borderWidth: 1
  },
  btn: {
    backgroundColor: '#23AA49',
    marginHorizontal: 10,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: '8%',
    marginBottom: '10%'
  },
  text: {
    // color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  modelbox: {
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,

  },

});