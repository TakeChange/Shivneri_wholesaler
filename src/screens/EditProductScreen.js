import { StyleSheet, TouchableOpacity, View, TextInput, Text,ScrollView, FlatList,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
//import { ScrollView } from 'react-native-virtualized-view'
const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
];

const EditProductScreen = () => {

    const [value, setValue] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [data, setData] = useState([]);
    const [selectedProductName, setSelectedProductName] = useState('');
    const [selectedSellingRate, setSelectedSellingRate] = useState('');
    const [selectedPurchesRate, setSelectedPurchesRate] = useState('');
    const [selectedStack,setSelectedStack] = useState('');
    const [selectedProductType,setSelectedProductType] = useState('');
    const [selectedBoxPrice,setSelectedBoxPrice] = useState('');
    const [filePath, setFilePath] = useState();

    const Product_list = useSelector((state) => state.product.data);

    const clearSearch = () => {
        setSearchInput("");
        setSelectedCustomerName("")
        setSelectedCustomerMobile("")
        setSelectedCustomerAddress("")
    };

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            // console.log('Response1 = ', response);

            if (response.didCancel) {
                //alert('User cancelled image picker');
                return;
            } else {
                const imageURI = response.assets[0].uri;
                console.log(imageURI);
                setFilePath(imageURI);
            }
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{item.product_name_eng}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );

    const handleItemClick = item => {
        if (item) {
            setSelectedProductName(item.product_name_eng ? item.product_name_eng.trim() : '');
            setSelectedStack(item.quantity ? item.quantity.trim() : '');
            setSelectedBoxPrice(item.price_per_unit ? item.price_per_unit.trim() : '');
            setSearchInput(item.product_name_eng ? item.product_name_eng.trim() : '');
            handleSearch(item.product_name_eng ? item.product_name_eng.trim() : '');
            setData([]);
        }
    };

    const handleSearch = text => {
        setSearchInput(text);
        if (text.trim() === '') {
            setData([]);
        } else {
            const filtered = sortedData.filter(item =>
                item.product_name_eng.toLowerCase().includes(text.toLowerCase())
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
                        placeholder="Search Product Name"
                        placeholderTextColor={'black'}
                        style={{ paddingHorizontal: 10, color: 'black' }}
                        onChangeText={(text) => {
                            setSearchInput(text);
                            handleSearch(text);
                        }}
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
            <Text style={styles.txt}>Product Name:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedProductName}
                    onChangeText={setSelectedProductName}
                />
                <Text style={styles.txt}>Selling Rate:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedSellingRate}
                    onChangeText={setSelectedSellingRate}
                />

                <Text style={styles.txt}>Purchase Rate:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedPurchesRate}
                    onChangeText={setSelectedPurchesRate}
                />

                <Text style={styles.txt}>Stack / Quantity:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedStack}
                    onChangeText={setSelectedStack}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.txt}>Product Type:</Text>
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
                            setValue(item.unit_type);
                        }}
                    />
                </View>

                <Text style={styles.txt}>Box Price:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedBoxPrice}
                    onChangeText={setSelectedBoxPrice}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.txt}>Upload Product Image :</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => chooseFile('photo')}>
                        <Text style={styles.img}>Choose Image</Text>
                    </TouchableOpacity>
                </View>
                <Text></Text>
                    {filePath == null ? <Image
                        style={styles.imageStyle}
                        source={{
                            uri: 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg',
                        }}
                    /> :
                        <Image
                            source={{ uri: filePath }}
                            style={styles.imageStyle}
                        />}

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.text}>Update Product</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>


    )
}

export default EditProductScreen

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
    dropdown: {
        width: '63%',
        borderWidth: 1,
        alignSelf: 'center',
        marginLeft: '2%',
        marginTop: '3%'
    },
    selectedTextStyle: {
        color: 'black',
        fontSize: 14,
    },
    placeholderStyle: {
        color: '#000',
        fontSize: 14,
    },
    buttonStyle: {
        backgroundColor: '#23AA49',
        padding: 8,
        width: '35%',
        borderRadius: 15,
        marginTop:'2%'
    },
    img: {
        fontWeight: '700',
        alignSelf: 'center',
        color: "#FFF"
    },
    imageStyle: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },

})