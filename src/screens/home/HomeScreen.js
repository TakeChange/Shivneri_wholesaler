import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, ScrollView, ToastAndroid, BackHandler, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import { useNavigationState } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { FetchProduct } from '../../api/FetchProduct';

const OpenModal = ({ visible, onClose, onSave }) => {
  const [customerName, setCustomerName] = useState('');
  const [nameVerify, setNameVerify] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileVerify, setMobileVerify] = useState('');
  const [address, setAddress] = useState('');
  const [addVerify, setAddVerify] = useState('');


  const handleSave = () => {
    onSave(customerName, mobileNumber, address);
    setCustomerName('');
    setMobileNumber('');
    setAddress('');
    onClose();
  };

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setCustomerName(nameVar);
    setNameVerify(false);
    const nameRegex = /^[A-Za-z]+(\s[A-Za-z]+)?$/;
    const nameVerify = nameVar.trim().length >= 2 && nameRegex.test(nameVar); // Minimum length of 2 characters and no spaces
    setNameVerify(nameVerify);


  }
  function handlemobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobileNumber(mobileVar);
    setMobileVerify(false);
    if (/[7-9]{1}[0-9]{9}/.test(mobileVar)) {
      setMobileNumber(mobileVar);
      setMobileVerify(true);
    }
  }

  function handleAddress(e) {
    const addressVar = e.nativeEvent.text;
    setAddress(addressVar);
    setAddVerify(false);
    if (addressVar.length > 1) {
      setAddVerify(true);
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <AntDesign name="close" size={25} color="black" onPress={handleSave} />
          </TouchableOpacity>

          <Text style={styles.modalText}>Customer Name:</Text>
          <View style={styles.modelerr}>
            <TextInput
              style={styles.input}
              value={customerName}
              onChange={e => handleName(e)}
            />
            {customerName.length < 1 ? null : nameVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <MaterialIcons name="error" color="#C34A2C" size={20} />
            )}
          </View>
          <Text style={styles.modalText}>Customer Mobile Number:</Text>
          <View style={styles.modelerr}>
            <TextInput
              style={styles.input}
              value={mobileNumber}
              keyboardType="numeric"
              maxLength={10}
              onChange={e => handlemobile(e)}
            />
            {mobileNumber.length < 1 ? null : mobileVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <MaterialIcons name="error" color="#C34A2C" size={20} />
            )}
          </View>
          <Text style={styles.modalText}>Address:</Text>
          <View style={styles.modelerr}>
            <TextInput
              style={styles.input}
              value={address}
              onChange={e => handleAddress(e)}
            />
            {address.length < 1 ? null : addVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <MaterialIcons name="error" color="#C34A2C" size={20} />
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveUser = (customerName, mobileNumber, address) => {
    console.log('Customer Name:', customerName);
    console.log('Mobile Number:', mobileNumber);
    console.log('Address:', address);

    registerNewUser(customerName, mobileNumber, address);

  }

  const fetchData = async () => {
    try {
      const getUser = 'https://demo.raviscyber.in/public/customerlist.php';
      const response = await axios.post(getUser,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { status, data } = response.data;
      // console.log('res', response);
      // console.log('const sorted = response.data.user_name', data)
      const sorted = data.sort((a, b) => {
        const nameA = a.user_name.toLowerCase();
        const nameB = b.user_name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setData(sorted);
      setSortedData(sorted);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = text => {
    setSearch(text);
    if (text.trim() === '') {
      setData([]);
    } else {
      const filtered = sortedData.filter(item =>
        item.user_name.toLowerCase().includes(text.toLowerCase())
      );
      setData(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(`${item.user_name} `)}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{`${item.user_name}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  const handleItemClick = itemName => {
    setSearch(itemName);
    handleSearch(itemName);
  };

  const registerNewUser = async (customerName, mobileNumber, address) => {
    setLoading(true);
    console.log("Hi")

    try {
      const loginUrl = 'https://demo.raviscyber.in/public/register.php';

      const response = await axios.post(loginUrl, {
        user_name: customerName,
        mobile_number: mobileNumber,
        address: address,
      },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { status, message } = response.data;
      console.log('res', message);

      if (status === "success") {

        ToastAndroid.show("Register Successfully", ToastAndroid.SHORT);
        ToastAndroid.show(message, ToastAndroid.SHORT);
        fetchData();
      } else {
        console.error('Registation Failed:', message);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Please enter valid username and password', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const NextScreen=()=>{
    console.log('Search',search);
    console.log('data',data);
    dispatch(FetchProduct());
    navigation.navigate('CategoryScreen');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textname1}>Please select a customer from the list or add a new customer using the button below.</Text>
      <View style={styles.modelbox}>
        <TextInput
          placeholder="Enter customer name"
          onChangeText={handleSearch}
          style={styles.textstyle}
          value={search}
        />
        {search.trim() !== '' && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
      <TouchableOpacity style={styles.buttonbox} onPress={NextScreen}>
        <Text style={styles.buttontxt}>NEXT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
        <Ionicons name="add" size={25} color="black" />
      </TouchableOpacity>

      <OpenModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textname1: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '900',
  },
  textstyle: {
    color:'#000000',
    fontSize: 18,
    fontWeight: '600',
    borderWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  modelbox: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  buttonbox: {
    height: 50,
    width: '25%',
    backgroundColor: '#23AA29',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontxt: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#23AA29',
    padding: 15,
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#8fbc8f',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '900',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    paddingHorizontal: 10,
    color:'black'
  },
  button: {
    backgroundColor: '#483d8b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    width: 100,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modelerr: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
