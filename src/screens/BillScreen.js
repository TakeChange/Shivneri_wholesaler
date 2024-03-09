import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Image, FlatList } from 'react-native';
import LeftArrow from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import Delete from 'react-native-vector-icons/Entypo';
import Dec from '../components/Dec';
import Inc from '../components/Inc';

const BillScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [productList, setProductList] = useState([
    {
      id: 1,
      image: require('../assets/logo.png'),
      name: 'soap ',
      type: 'dsfsdf',
      price: 210,
      counter: 1
    },
    {
      id: 2,
      image: require('../assets/logo.png'),
      name: 'dishwasher',
      type: 'Bsdfsdf',
      price: 100,
      counter: 1
    },
    {
      id: 3,
      image: require('../assets/logo.png'),
      name: 'dishwasher',
      type: 'Bsdfsdf',
      price: 500,
      counter: 1
    },
    {
      id: 4,
      image: require('../assets/logo.png'),
      name: 'dishwasher',
      type: 'Bsdfsdf',
      price: 1100,
      counter: 1
    },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [key, setKey] = useState(Date.now()); // Unique key for FlatList re-render

  useEffect(() => {
    calculateTotal();
  }, []);

  useEffect(() => {
    // Update key when productList changes to re-render FlatList
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
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.flatdataview}>
          <Text style={{ fontSize: 13, color: 'black', marginTop: '2%' }}>Type: {item.name}</Text>
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
            <View style={{ marginHorizontal: '5%' }}>
              <Text style={{ color: 'black' }}>{item.counter}</Text>
            </View>
            <Dec onPress2={handleClick2} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.lefticon}>
          <LeftArrow
            name='chevron-small-left'
            size={35}
            color='black'
          />
        </TouchableOpacity>
        <Text style={styles.headtext}>Bill Screen</Text>
      </View>

      <View style={styles.custnameview}>
        <Text style={styles.custtext}>Customer name</Text>
      </View>
      <View style={styles.rempenview}>
        <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>Remaining:0000</Text>
        <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>Pending:000000</Text>
      </View>

      <View style={styles.searchbar}>
        <TouchableOpacity onPress={() => console.log('Search')}>
          <Icon name="search" size={25} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        {searchText !== '' && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Icon name="close" size={25} color="black" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        key={key} // Pass key to FlatList
        data={productList}
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        renderItem={({ item, index }) => <Product item={item} index={index} />}
      />
      <View style={{ marginTop: '10%', alignItems: 'flex-end' }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Total : {totalAmount}/-</Text>
      </View>
      
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default BillScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  //// header
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  lefticon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40 / 2,
    borderColor: '#ccc',
    borderWidth: 1
  },
  headtext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'flex-end',
    marginHorizontal: '5%',

  },

  ///customer name

  custnameview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  custtext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',

  },

  ////remaining & pending
  rempenview: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  //////Searchbar
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: '5%'
  },
  input: {
    flex: 1,
    marginLeft: 5,
  },
  icon: {
    padding: 10,
  },

  ///flatlist
  flamainview: {
    height: 150,
    flexDirection: 'row',
    borderRadius: 20,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginVertical: 5
  },

  flatimageview: {
    backgroundColor: 'red',
    width: '25%',

  },
  flatdataview: {
    //backgroundColor: 'yellow',
    width: '50%'
  },
  delidview: {
    flexDirection: 'column',
    //backgroundColor: 'pink',
    width: '25%'
  },
  del: {
    //backgroundColor: 'orange',
    height: 80,
    alignItems: 'flex-end'
  },
  id: {
    //backgroundColor: 'green',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatdeleteicon: {
    width: 30,
    height: 30,
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
    marginTop: '10%',
    marginBottom: '10%'
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
});
