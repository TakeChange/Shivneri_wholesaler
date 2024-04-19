

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { ListItem } from 'react-native-elements';
import Textarea from 'react-native-textarea';
const CreditBalanceScreen = () => {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedCustomerName, setSelectedCustomerName] = useState('');
    const [selectedCustomerMobile, setSelectedCustomerMobile] = useState('');
    const [selectedCustomerAddress, setSelectedCustomerAddress] = useState('');

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
            const getUser = 'https://demo.raviscyber.in/public/customerlist.php';
            const response = await axios.post(getUser, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const { status, data } = response.data;
            const sorted = data.sort((a, b) => {
                const nameA = a.user_name.toLowerCase();
                const nameB = b.user_name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            setData(sorted);
            setSortedData(sorted);
            console.log(sorted)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{item.user_name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );

    const handleItemClick = item => {
        if (item) {
            setSelectedCustomerName(item.user_name ? item.user_name.trim() : '');
            setSelectedCustomerMobile(item.mobile_number ? item.mobile_number.trim() : '');
            setSelectedCustomerAddress(item.address ? item.address.trim() : '');
            setSearchInput(item.user_name ? item.user_name.trim() : '');
            handleSearch(item.user_name ? item.user_name.trim() : '');
            setData([]);
        }
    };


    const handleSearch = text => {
        setSearchInput(text);
        if (text.trim() === '') {
            setData([]);
        } else {
            const filtered = sortedData.filter(item =>
                item.user_name.toLowerCase().includes(text.toLowerCase())
            );
            setData(filtered);
        }
    };

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
                        style={{ paddingHorizontal: 10,color:'black' }}
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
                <Text style={styles.txt}>Customer name:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedCustomerName}
                    onChangeText={setSelectedCustomerName}
                />

                <Text style={styles.txt}>Customer Mobile:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedCustomerMobile}
                    onChangeText={setSelectedCustomerMobile}
                />

                <Text style={styles.txt}>Customer Address:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedCustomerAddress}
                    onChangeText={setSelectedCustomerAddress}
                />

                <Text style={styles.txt}>Pending Amount:</Text>
                <TextInput
                    style={styles.textinput1}
                />

                <Text style={styles.txt}>Add new credit amount:</Text>
                <TextInput
                    style={styles.textinput1}
                />

                <Text style={styles.txt}>Description:</Text>
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea} 
                    maxLength={120}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />

                <TouchableOpacity style={styles.btn}>
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
        marginTop: '5%',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textinput1: {
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
        color:'black',
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
