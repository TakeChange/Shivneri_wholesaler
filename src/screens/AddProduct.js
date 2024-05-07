import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
const AddProduct = () => {
    const [filePath, setFilePath] = useState();
    const [productname, setProductname] = useState('');
    const [boxprice, setBoxPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState('');
    const [categories, setCategories] = useState([]);
    const [filePatherr, setFilePathErr] = useState();
    const [pnameerr, setpnameErr] = useState('');
    const [boxpriceerr, setBoxPriceErr] = useState('');
    const [quantityerr, setQuantityErr] = useState('');
    const [totalerr, setTotalErr] = useState('');
    // const [selected, setSelected] = React.useState("");
    const [selected, setSelected] = React.useState("");
    const [data,setData] = React.useState([]);
    // const data = [
    //     { key: '1', value: 'Mobiles' },
    //     { key: '2', value: 'Appliances' },
    //     { key: '3', value: 'Cameras' },
    //     { key: '4', value: 'Computers'},
    //     { key: '5', value: 'Vegetables' },
    //     { key: '6', value: 'Diary Products' },
    //     { key: '7', value: 'Drinks' },
    // ];
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://demo.raviscyber.in/public/categorylist.php');
            const responseJson = response.data;
    
            console.log('Response data:', responseJson); // Log response data to check its structure
    
            if (responseJson.status === 'success') {
                // Check if response data is an array
                if (Array.isArray(responseJson.data)) {
                    // If it's an array, proceed with mapping
                    let newArray = responseJson.data.map((item) => ({
                        key: item.id,
                        value: item.category_name
                    }));
                    setData(newArray);
                } else {
                    console.error('Error: Response data is not an array');
                }
            } else {
                console.error('Error: Response status is not success');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const addProd = () => {
        var isValid = true;
        if (productname == '') {
            setpnameErr('Product name do not empty');
            isValid = false;
        } else {
            setpnameErr('');
        }
        if (boxprice == '') {
            setBoxPriceErr('Box price do not empty');
            isValid = false;
        } else {
            setBoxPriceErr('');
        }
        if (quantity == '') {
            setQuantityErr('Quantity do not empty');
            isValid = false;
        } else {
            setQuantityErr('');
        }
        if (total == '') {
            setTotalErr('Total do not empty');
            isValid = false;
        } else {
            setTotalErr('');
        }
        if (filePath == '') {
            setFilePathErr('File path do not empty');
            isValid = false;
        } else {
            setFilePathErr('');
        }
        if (isValid) {

            console.log(productname);
            console.log(boxprice);
            console.log(quantity);
            console.log(total);

            setProductname('');
            setBoxPrice('');
            setQuantity('');
            setTotal('');
        }
    }
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

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                // Reset errors when navigating away from screen
                setFilePathErr('');
                setpnameErr('');
                setBoxPriceErr('');
                setQuantityErr('');
                setTotalErr('');
            };
        }, [])
    );


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.All}>
                    <Text style={styles.name}>Product Name Marathi:</Text>
                    <TextInput
                        style={styles.input}
                        value={productname}
                        onChangeText={(text) => setProductname(text)}
                    />
                    <Text style={styles.error}>{pnameerr}</Text>

                    <Text style={styles.name}>Product Name English:</Text>
                    <TextInput
                        style={styles.input}
                        value={productname}
                        onChangeText={(text) => setProductname(text)}
                    />
                    <Text style={styles.error}>{pnameerr}</Text>

                    <Text style={styles.name}>Min Quantity :</Text>
                    <TextInput
                        style={styles.input}
                        value={quantity}
                        onChangeText={(text) => setQuantity(text)}
                    />
                    <Text style={styles.error}>{quantityerr}</Text>
                    <Text style={styles.name}>Category :</Text>
                    <View style={{margin:15}}>
                    <SelectList setSelected={setSelected} data={data} onSelect={() => alert(selected)} />
                    </View>
                    <Text style={styles.name}>Enter Box Price :</Text>
                    <TextInput
                        style={styles.input}
                        value={boxprice}
                        onChangeText={(text) => setBoxPrice(text)}
                    />
                    <Text style={styles.error}>{boxpriceerr}</Text>

                    <Text style={styles.name}>Total :</Text>
                    <TextInput
                        style={styles.input}
                        value={total}
                        onChangeText={(text) => setTotal(text)}
                    />
                    <Text style={styles.error}>{totalerr}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={styles.Upload}>Upload Product Image :</Text>
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

                </View>

                <TouchableOpacity
                    style={styles.addBut}
                    onPress={addProd}
                >
                    <Text style={styles.img}>Add Product</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    All: {
        marginTop: '13%',
    },
    name: {
        color: '#000',
        marginLeft: '5%',
        fontWeight: '700'
    },
    input: {
        color: 'black',
        height: '5%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        //padding: '2%',
        width: '90%',
        justifyContent: 'flex-end',
        fontSize: 15,
        //marginBottom: '1%'
    },
    Upload: {
        color: '#000',
        fontWeight: '700',
        marginTop: '2%'
    },
    img: {
        fontWeight: '700',
        alignSelf: 'center',
        color: "#FFF"
    },
    buttonStyle: {
        backgroundColor: '#23AA49',
        padding: 8,
        width: '35%',
        borderRadius: 15
    },
    imageStyle: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    addBut: {
        backgroundColor: '#23AA49',
        padding: 15,
        width: '80%',
        alignSelf: 'center',
        marginBottom: '5%',
        borderRadius: 25
    },
    error: {
        color: 'red',
        //marginHorizontal: 10,
        marginBottom: '1%',
        marginLeft: '5%',

    }

});