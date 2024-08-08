import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import { CheckBox } from 'react-native-elements';
const AddProduct = () => {
    const [filePath, setFilePath] = useState();
    const [productname, setProductname] = useState('');
    const [productname_marathi, setProductname_marathi] = useState('');
    const [boxprice, setBoxPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [filePatherr, setFilePathErr] = useState();
    const [pnameerr, setpnameErr] = useState('');
    const [pnameerr_marathi, setpnameErr_marathi] = useState('');
    const [img_error, setImageError] = useState('');
    const [boxpriceerr, setBoxPriceErr] = useState('');
    const [quantityerr, setQuantityErr] = useState('');
    const [totalerr, setTotalErr] = useState('');
    const [selectedUnit, setSelectedUnit] = useState("");
    const [selectedBoxUnit, setSelectedBoxUnit] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryError, setSelectedCategoryError] = useState("");
    const [selectedBoxUnitError, setSelectedBoxUnitError] = useState("");
    const [selectedUnitError, setSelectedUnitError] = useState("");
    const [data, setData] = React.useState([]);
    const [dataBoxUnit, setDataBoxUnit] = useState([]);
    const [dataUnit, setDataUnit] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [unitPriceInput, setUnitPriceInput] = useState('');
    const [unitPriceInputError, setUnitPriceInputError] = useState('');

    useEffect(() => {
        fetchData();
        fetchBoxUnit();
        fetchUnit();
    }, []);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
        setUnitPriceInput(''); 
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://demo.raviscyber.in/public/categorylist.php');
            const responseJson = response.data;
            
            if (responseJson.status === 'success') {
                
                if (Array.isArray(responseJson.data)) {
                    
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

    const fetchBoxUnit = async () => {
        try {
            const response = await axios.get('https://demo.raviscyber.in/public/box_unitList.php');
            const responseJson = response.data;
          
            let newArray = responseJson.data.map((item, index) => ({
                key: index,
                value: item
            }));
           
            setDataBoxUnit(newArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUnit = async () => {
        try {
            const response = await axios.get('https://demo.raviscyber.in/public/product_unitList.php');
            const responseJson = response.data;
           
            let newArray = responseJson.data.map((item, index) => ({
                key: index,
                value: item
            }));
           
            setDataUnit(newArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addProd = () => {
        var isValid = true;
        if (filePath == null) {
            setImageError('Image is required')
        } else {
            setImageError('')
        }

        if (productname_marathi == '') {
            setpnameErr_marathi('उत्पादनाचे नाव रिक्त करू नका');
            isValid = false;
        } else {
            setpnameErr_marathi('');
        }
        
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
        if (filePath == '') {
            setFilePathErr('File path do not empty');
            isValid = false;
        } else {
            setFilePathErr('');
        }
        
        if (selectedCategory == '') {
            setSelectedCategoryError('Please select at once category');
            isValid = false;
        } else {
            setSelectedCategoryError('');
        }

        if (selectedBoxUnit === "") {
            setSelectedBoxUnitError('Please select at once box unit');
            isValid = false;
        } else {
            setSelectedBoxUnitError('');
        }
        
        if (isChecked == true) {
            if(selectedUnit === "" )
            {
                setSelectedUnitError('Please select at once unit');
                isValid = false;
            }else{
                setSelectedUnitError('');
            }
        } else {
            setSelectedUnitError('');
        }
       
        if (isChecked == true) {
            if(unitPriceInput==="")
            {
                setUnitPriceInputError('Unit do not empty');
                isValid = false;
            }else{
                setUnitPriceInputError('');
            }
        } else {
            setUnitPriceInputError('');
        }

        if (isChecked == true) {
            if(selectedUnit==="")
            {
                setSelectedUnitError('Product name do not empty');
                isValid = false;
            }
        } else {
            setSelectedUnitError('');
        }

        
        if (isValid) {
           
            let obj = {
                product_image:filePath,
                product_name:productname_marathi,
                product_name_eng:productname,
                min_qty:quantity,
                product_cateory_id:selectedCategory,
                box_unit:selectedBoxUnit,
                sell_price_cash_per_box:boxprice,
                unit:selectedUnit,
                sell_price_cash_per_pack:unitPriceInput
            }   
            handleAdd(obj);
        }
    }

    const handleAdd = async (param) => {
       
        try {
            const addProdUrl = 'https://demo.raviscyber.in/public/product.php';

            const response = await axios.post(addProdUrl, param,
             {
                headers: {
                  "Content-Type": "multipart/form-data",
                  
                },
              }
            );

            const { status, message } = response.data;
            ToastAndroid.show('Product added successfully!!', ToastAndroid.SHORT);
         
        } catch (error) {
            console.log('error',error)
            ToastAndroid.show('Please enter valid username and password', ToastAndroid.SHORT);
        } finally {
        }
    };

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                return;
            } else {
                const imageURI = response.assets[0].uri;
               // console.log(imageURI);
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
                <Text style={styles.error}>{img_error}</Text>
                <View style={styles.All}>
                    <Text style={styles.name}>उत्पादनाचे नाव मराठी प्रविष्ट करा </Text>
                    <TextInput
                        style={styles.inputfield_style}
                        placeholder='उत्पादनाचे नाव मराठी प्रविष्ट करा '
                        placeholderTextColor={'black'}
                        value={productname_marathi}
                        onChangeText={(text) => setProductname_marathi(text)}
                    />
                    <Text style={styles.error}>{pnameerr_marathi}</Text>

                    <Text style={styles.name}>Product name english</Text>
                    <TextInput
                        style={styles.inputfield_style}
                        placeholder='Product name english'
                        placeholderTextColor={'black'}
                        value={productname}
                        onChangeText={(text) => setProductname(text)}
                    />
                    <Text style={styles.error}>{pnameerr}</Text>

                    <Text style={styles.name}>Min quantity</Text>
                    <TextInput
                        style={styles.inputfield_style}
                        placeholder='Min quantity'
                        placeholderTextColor={'black'}
                        value={quantity}
                        onChangeText={(text) => setQuantity(text)}
                    />
                    <Text style={styles.error}>{quantityerr}</Text>
                    <Text style={styles.name}>Category :</Text>

                    <SelectList setSelected={setSelectedCategory} data={data} onSelect={() => alert(selectedCategory)} />
                    <Text style={styles.error}>{selectedCategoryError}</Text>

                    <Text style={styles.name}>Box Unit</Text>
                    <SelectList setSelected={setSelectedBoxUnit} data={dataBoxUnit} onSelect={() => alert(selectedBoxUnit)} />
                    <View>
                        <Text style={styles.error}>{selectedBoxUnitError}</Text>
                        <Text style={styles.name}>Sell price cash per box</Text>
                        <TextInput
                            style={styles.inputfield_style}
                            placeholder='Sell price cash per box'
                            placeholderTextColor={'black'}
                            value={boxprice}
                            onChangeText={(text) => setBoxPrice(text)}
                        />
                        <Text style={styles.error}>{boxpriceerr}</Text>
                    </View>
                    <CheckBox
                        title='Pack'
                        checked={isChecked}
                        onPress={toggleCheckbox}
                        backgroundColor="red"
                        backfaceVisibility={false}
                        style={{ backfaceVisibility: false, backgroundColor: 'red' }}
                    />
                    {isChecked && (
                        <View>
                            <Text style={styles.name1}>Unit</Text>
                            <SelectList setSelected={setSelectedUnit} data={dataUnit} onSelect={() => alert(selectedUnit)} />
                            <Text style={styles.error}>{selectedUnitError}</Text>
                            <TextInput
                                style={styles.inputfield_style}
                                placeholder="Enter selected unit price"
                                onChangeText={setUnitPriceInput}
                                placeholderTextColor={"black"}
                                value={unitPriceInput}
                            />
                            <Text style={styles.error}>{unitPriceInputError}</Text>
                        </View>
                    )}
                </View>
            </View>
            <TouchableOpacity
                style={styles.addBut}
                onPress={addProd}
            >
                <Text style={styles.img}>Add Product</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    All: {
        margin: 15
    },
    name: {
        color: '#000',
        fontWeight: '700',
    },
    name1: {
        color: '#000',
        fontWeight: '700',
        marginTop: 10
    },
    inputfield_style: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        marginTop: 5,
        borderRadius: 5,
        color:'black'
    },
    input: {
        color: 'black',
        height: '5%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        width: '90%',
        justifyContent: 'flex-end',
        fontSize: 15,
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
    }

});



