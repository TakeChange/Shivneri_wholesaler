

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { ListItem } from 'react-native-elements';
import Textarea from 'react-native-textarea';
import { useFocusEffect } from '@react-navigation/native';
const CreditBalanceScreen = () => {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedCustomerName, setSelectedCustomerName] = useState('');
    const [selectedCustomerMobile, setSelectedCustomerMobile] = useState('');
    const [selectedCustomerAddress, setSelectedCustomerAddress] = useState('');
    const [pendingAmount, setPendingAmount] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [description, setDescription] = useState('');

    const clearSearch = () => {
        setSearchInput("");
        setSelectedCustomerName("")
        setSelectedCustomerMobile("")
        setSelectedCustomerAddress("")
    };

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const getUser = 'https://demo.raviscyber.in/public/customer_payment_list.php'
            const response = await axios.post(getUser, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setData(response.data);
            setSortedData(response.data);

            // console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{item.cust_name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );

    const handleItemClick = item => {
        if (item) {
            setSelectedCustomerName(item.cust_name ? item.cust_name.trim() : 'null');
            setSearchInput(item.cust_name ? item.cust_name.trim() : ''); // Set the search input with the selected customer name
            setSelectedCustomerMobile(item.mobile_number ? item.mobile_number.trim() : 'null');
            setSelectedCustomerAddress(item.address ? item.address.trim() : 'null');
            setPendingAmount(item.pending_amount ? item.pending_amount.trim() : '0');
            setNewAmount(item.pending_amount ? item.pending_amount.trim() : '0');
            handleSearch(item.cust_name ? item.cust_name.trim() : '');
            setData([]);
        }
    };


    const handleSearch = text => {
        setSearchInput(text);
        if (text.trim() === '') {
            setData([]);
        } else {
            const filtered = sortedData.filter(item =>
                item.cust_name.toLowerCase().includes(text.toLowerCase())
            );
            setData(filtered);
        }
    };


    //Validation
    const [searchError, setSearchError] = useState();
    const [customerNameError, setCustomerNameError] = useState();
    const [customerMobileError, setMobileError] = useState();
    const [customerAddError, setCustomerAddError] = useState();
    const [pendingError, setPendingError] = useState();
    const [newAmountError, setNewAmountError] = useState();
    const [descriptionError, setDescriptiontError] = useState();

    const Validation = () => {
        var isValid = true;
        if (searchInput == '') {
            setSearchError('Please search product');
            isValid = false;
        } else {
            setSearchError('');
        }
        if (selectedCustomerName == '') {
            setCustomerNameError('Customer name do not empty');
            isValid = false;
        } else {
            setCustomerNameError('');
        }

        if (selectedCustomerMobile == '') {
            setMobileError('Mobile Number do not empty');
            isValid = false;
        } else {
            setMobileError('');
        }

        if (selectedCustomerAddress == '') {
            setCustomerAddError('Address do not empty');
            isValid = false;
        } else {
            setCustomerAddError('');
        }

        if (pendingAmount == '') {
            setPendingError(' Enter  Pending Amount');
            isValid = false;
        } else {
            setPendingError('');
        }
        if (newAmount == '') {
            setNewAmountError('Select New Amount');
            isValid = false;
        } else {
            setNewAmountError('');
        }
        if (description == '') {
            setDescriptiontError('Enter Desciption');
            isValid = false;
        } else {
            setDescriptiontError('');
        }
        if (isValid) {
            //handleLogin();
            // console.log('success')
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setSearchError('');
                setCustomerNameError('');
                setMobileError('');
                setCustomerAddError('');
                setPendingError('');
                setNewAmountError('');
                setDescriptiontError('');
            };
        }, [])
    );


    return (
        <ScrollView style={styles.container}>
            <View style={styles.search}>
                <Icon name="search" size={22} color="black" style={{ padding: 10 }} />
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder="Search Customer Name"
                        placeholderTextColor={'black'}
                        value={searchInput}
                        onChangeText={(text) => {
                            setSearchInput(text);
                            handleSearch(text);
                        }}
                        style={{ paddingHorizontal: 10, color: 'black' }}
                    />
                </View>
                {searchInput.length > 0 && (
                    <TouchableOpacity onPress={clearSearch}>
                        <Icon name="close" size={25} color="black" style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>
                )}
            </View>
            {searchInput.trim() !== '' && (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
            <View>
                <Text style={{ color: 'red', fontWeight: '600' }}>{searchError}</Text>
                <Text style={styles.txt}>Customer name:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedCustomerName}
                    onChangeText={setSelectedCustomerName}
                />
                <Text style={{ color: 'red', fontWeight: '600', }}>{customerNameError}</Text>
                <Text style={styles.txt}>Customer Mobile:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedCustomerMobile}
                    onChangeText={setSelectedCustomerMobile}
                />
                <Text style={{ color: 'red', fontWeight: '600' }}>{customerMobileError}</Text>
                <Text style={styles.txt}>Customer Address:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedCustomerAddress}
                    onChangeText={setSelectedCustomerAddress}
                />
                <Text style={{ color: 'red', fontWeight: '600' }}>{customerAddError}</Text>
                <Text style={styles.txt}>Pending Amount:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={pendingAmount}
                    onChangeText={setPendingAmount}
                />
                <Text style={{ color: 'red', fontWeight: '600' }}>{pendingError}</Text>
                <Text style={styles.txt}>Add new credit amount:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={newAmount}
                    onChangeText={setNewAmount}
                />
                <Text style={{ color: 'red', fontWeight: '600' }}>{newAmountError}</Text>
                <Text style={styles.txt}>Description:</Text>
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    maxLength={120}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                    value={description}
                    onChangeText={setDescription}
                />
                <Text style={{ color: 'red', fontWeight: '600' }}>{descriptionError}</Text>
                <TouchableOpacity style={styles.btn} onPress={Validation}>
                    <Text style={styles.text}>Update Customer</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CreditBalanceScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
    },
    txt: {
        color: 'black',
        marginTop: '3%',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textinput1: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        color: 'black',
    },
    btn: {
        backgroundColor: '#23AA49',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: '10%',
        marginBottom: '10%'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },

    /////textarea
    textareaContainer: {
        height: 180,
        padding: 5,
        borderColor: 'grey',
        borderWidth: 1,
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
});


