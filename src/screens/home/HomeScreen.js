import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, ScrollView, Modal,} from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';

const OpenModal = ({ visible, onClose, onSave }) => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    onSave(customerName, mobileNumber, address);
    setCustomerName('');
    setMobileNumber('');
    setAddress('');
    onClose();
  };
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
            <AntDesign name="close" size={25} color="black" />
          </TouchableOpacity>


          <Text style={styles.modalText}>Customer Name:</Text>
          <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={setCustomerName}
          />

          <Text style={styles.modalText}>Customer Mobile Number:</Text>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="numeric"
          />
          <Text style={styles.modalText}>Address:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveUser = (customerName, mobileNumber,address) => {
    console.log('Customer Name:', customerName);
    console.log('Mobile Number:', mobileNumber);
    console.log('Address:', address);
  }


  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=30');
      const sorted = response.data.results.sort((a, b) => {
        const nameA = a.name.first.toLowerCase();
        const nameB = b.name.first.toLowerCase();
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
        item.name.first.toLowerCase().includes(text.toLowerCase()) ||
        item.name.last.toLowerCase().includes(text.toLowerCase())
      );
      setData(filtered);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(`${item.name.first} ${item.name.last}`)}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{`${item.name.first} ${item.name.last}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
  const handleItemClick = itemName => {
    setSearch(itemName);
    handleSearch(itemName);

  };

  return (
    <ScrollView>
      <Modal visible={true}>
        <View marginTop='20%' margin='8%'>
          <Text style={styles.textname1}>Please select customer from list or add</Text>
          <Text style={styles.textname2}>new customer using below button</Text>

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
          <View>
          <TouchableOpacity style={styles.buttonbox} onPress={() => navigation.navigate('')}>
            <Text style={styles.buttontxt}>NEXT</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.flotingbutton}>
            <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
              <Ionicons name="add" size={25} color="black" />
            </TouchableOpacity>

            <OpenModal
              visible={modalVisible}
              onClose={handleCloseModal}
              onSave={handleSaveUser}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

};
export default HomeScreen;
const styles = StyleSheet.create({
  textname1: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '900',

  },
  textname2: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '900',
    marginStart: 17
  },
  textstyle: {
    fontSize: 18,
    fontWeight: '600',
    borderWidth: 1,
    borderBottomColor: '#000000',
   
  },
  modelbox: {
    width: '90%',
    height: '36%',
    backgroundColor: '#fff',
    margin: '6%',
    
  },
  buttonbox: {
    height: 50,
    width: '25%',
    backgroundColor: '#23AA29',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '35%'
  },
  buttontxt: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  flotingbutton: {
    marginTop: '75%',
    marginHorizontal: '80%'
  },
  addButton: {
    backgroundColor: '#23AA29',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 25,
    width: 50,
    height: 50
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
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#483d8b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    width: 100,
    textAlign: 'center'
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})
