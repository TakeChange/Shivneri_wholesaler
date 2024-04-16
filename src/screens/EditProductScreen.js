import { StyleSheet, TouchableOpacity, View, TextInput, Text, ScrollView, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
];

const EditProductScreen = () => {

    const [value, setValue] = useState(null);

    const Product_list = useSelector((state) => state.product.data?.data);
    console.log('All product data:',Product_list);//product_list product name 

    return (

        <View style={styles.container}>
            <View style={styles.searchbar}>
                <TouchableOpacity>
                    <Icon name="search" size={25} color="black" style={styles.icon} />
                </TouchableOpacity>
                <View style={styles.modelbox}>
                    <TextInput
                        placeholder="Search..."
                        style={styles.textinput}
                    />

                </View>
            </View>


            <View style={styles.text}>
                <Text style={styles.name}>Product Name : </Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.name}>Selling Rate :      </Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.name}>Purchase Rate : </Text>
                <TextInput
                    style={styles.input}
                />
                <Text style={styles.name}>Stock/quantity : </Text>
                <TextInput
                    style={styles.input}
                />
                <View style={{ flexDirection: 'row', marginBottom: '8%' }}>
                    <Text style={styles.proType}>Product Type : </Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data}
                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        value={value}
                        onChange={item => {
                            setValue(item.value);
                        }}
                    />
                </View>
                <Text style={styles.name}>Box Price : </Text>
                <TextInput
                    style={styles.input}
                />
                <View>
                    <TouchableOpacity style={styles.addBut}>
                        <Text style={styles.img}>Update Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default EditProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        color: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: '2%'
    },
    modelbox: {
        width: '80%',
    },
    icon: {
        padding: 10,
    },
    textinput: {
        color: 'black',
        flex: 1,
    },
    input: {
        height: 40,
        alignSelf: 'center',
        borderBottomWidth: 1,
        padding: '2%',
        width: '90%',
        justifyContent: 'flex-end',
        fontSize: 15,
        marginBottom: '5%'
    },
    name: {
        color: '#000',
        marginLeft: '5%',
        fontWeight: '700',
    },
    proType: {
        color: '#000',
        marginLeft: '5%',
        fontWeight: '700',
        alignSelf: 'center'
    },
    dropdown: {
        width: '63%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignSelf: 'center',
        marginLeft: '2%'
    },
    selectedTextStyle: {
        color: 'black',
        fontSize: 14,
    },
    placeholderStyle: {
        color: '#000',
        fontSize: 14,
    },
    button: {
        borderRadius: '20%',
        width: 50
    },
    addBut: {
        backgroundColor: '#23AA49',
        padding: 15,
        width: '95%',
        alignSelf: 'center',
        marginTop: '20%',
        marginBottom: '5%',
        borderRadius: 20
    },
    img: {
        fontWeight: '700',
        alignSelf: 'center',
        color: "#FFF"
    },


})