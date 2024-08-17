import { StyleSheet, TouchableOpacity, View, TextInput, Text, ScrollView, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { ListItem } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
const EditProductScreen = () => {
    const [productList, setProductList] = useState([]);
    const [selectedProductName, setSelectedProductName] = useState('');
    const [selectedProductNameMarathi, setSelectedProductNameMarathi] = useState('');
    const [selectedBoxPrice, setSelectedBoxPrice] = useState('');
    const [selectedunitPrice, setSelectedunitPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [dataBoxUnit, setDataBoxUnit] = useState([]);
    const [dataUnit, setDataUnit] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBoxUnit, setSelectedBoxUnit] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [data1, setData1] = React.useState([]);
    const [quantity, setQuantity] = useState('');


    ///All error message
    const [searchError, setSearchError] = useState('');
    const [imageError, setImageError] = useState('');
    const [marathinameerror, setMarathinameerror] = useState('');
    const [englishnameerror, setEnglishnameerror] = useState('');
    const [quantityerror, setQuantityerror] = useState('');
    const [categoryerror, setCategoryerror] = useState('');
    const [boxuniterror, setBoxUniterror] = useState('');
    const [boxpriceerror, setBoxPriceError] = useState('');
    const [uniterror, setUniterror] = useState('');
    const [unitpriceerror, setUnitPriceError] = useState('');
    const [dropdownData, setDropdownData] = useState([]); 

    useEffect(() => {
        fetchData();
        fetchBoxUnit();
        fetchUnit();
        fetchCategoryData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://demo.raviscyber.in/public/category_wise_productList.php');
            const responseData = response.data;
            setProductList(responseData);

            // Extract unique unit types for dropdown
            const units = Array.from(new Set(responseData.flatMap(item => {
                return [item.unit_name, item.box_unit_name].filter(Boolean);
            }))).map(unit => ({ label: unit, value: unit }));

            setDropdownData(units);
             console.log('Product List Data:', responseData); // Log product list data
            // console.log('Units for Dropdown:', units); // Log units for dropdown
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    };

    const fetchCategoryData = async () => {
        try {
            const response = await axios.get('https://demo.raviscyber.in/public/categorylist.php');
            const responseJson = response.data;

            if (responseJson.status === 'success') {
                if (Array.isArray(responseJson.data)) {
                    let newArray = responseJson.data.map((item) => ({
                        key: item.id,
                        value: item.category_name
                    }));
                    setData1(newArray);

                    //console.log('Category List Data:', newArray); // Log category list data
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
            ///console.log('Box Unit List Data:', newArray); // Log box unit list data
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
            //console.log('Product Unit List Data:', newArray); // Log product unit list data
        } catch (error) {
            console.error('Error fetching data:', error);
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
                setSelectedImage(imageURI);
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
            // Update state with selected item details
            setSelectedProductName(item.product_name_eng ? item.product_name_eng.trim() : '');
            setSelectedProductNameMarathi(item.product_name ? item.product_name.trim() : '');
            setSelectedBoxPrice(item.sell_price_cash_per_box ? item.sell_price_cash_per_box.trim() : '');
            setSelectedunitPrice(item.sell_price_cash_per_pack ? item.sell_price_cash_per_pack.trim() : '');
            setSelectedImage(item.product_image ? item.product_image.trim() : '');
            setSearchInput(item.product_name_eng ? item.product_name_eng.trim() : '');
            setQuantity(item.min_qty ? item.min_qty.trim() : '');

            // Set the product type based on the selected item
            const unitOptions = [];
            if (item.unit_name) {
                unitOptions.push({
                    label: item.unit_name,
                    value: item.unit_name
                });
            }
            if (item.box_unit_name) {
                unitOptions.push({
                    label: item.box_unit_name,
                    value: item.box_unit_name
                });
            }
            // setDropdownData(unitOptions);



            // Log selected product details to console
            console.log('Selected Product Name (English):', item.product_name_eng);
            console.log('Selected Product Name (Marathi):', item.product_name);
            console.log('Selected Box Price:', item.sell_price_cash_per_box);
            console.log('Selected Product Image URL:', item.product_image);
            console.log('Selected Product Box Unit Name:', item.box_unit_name);
            console.log('Selected Category ID:', item.product_cateory_id);
            console.log('Selected box_unit_name:', item.box_unit_name);
            console.log('Selected Unit Name:', item.unit_name);
            console.log("quantity", item.min_qty)

            // Find the category name
            const category = data1.find(cat => cat.key === item.product_cateory_id);
            const categoryName = category ? category.value : 'Unknown Category';
            console.log('Selected Category Name:', categoryName);
            setSelectedCategory(categoryName);


            // box unit
            const selectedBoxUnit = dataBoxUnit.find(box => box.value === item.box_unit_name);
            setSelectedBoxUnit(selectedBoxUnit ? selectedBoxUnit.value : '');
            console.log(selectedBoxUnit)
            console.log('Selected Box Price:', item.sell_price_cash_per_box);

            //sub unit
            const selectedUnit = dataUnit.find(unit => unit.value === item.unit_name);
            setSelectedUnit(selectedUnit ? selectedUnit.value : '');
            console.log(selectedUnit)
            console.log('Selected unit Price:', item.sell_price_cash_per_pack);

            setData([]);
        }
    };

    const clearSearch = () => {
        setSearchInput('');
        setData([]);
        setSelectedProductName('');
        setSelectedProductNameMarathi('');
        setSelectedBoxPrice('');
        setSelectedunitPrice('');
        setSelectedImage('');
        setQuantity('');
        setSelectedCategory('');
        setSelectedBoxUnit('');
        setSelectedUnit('');
    };
    
    const handleSearch = text => {
        setSearchInput(text);
        if (text.trim() === '') {
             clearSearch();
        } else {
            const filtered = productList.filter(item =>
                item.product_name_eng.toLowerCase().includes(text.toLowerCase())
            );
            setData(filtered);
        }
    };

    const Validation = () => {
        let isValid = true;
        setSearchError('');
        setBoxPriceError('');
        setImageError('');
        setMarathinameerror('');
        setEnglishnameerror('');
        setQuantityerror('');
        setCategoryerror('');
        setBoxUniterror('');
        setUniterror('');
        setUnitPriceError('');


        if (selectedProductNameMarathi.trim() === "") {
            setMarathinameerror("Product name in Marathi is required");
            isValid = false;
        }
        if (selectedProductName.trim() === "") {
            setEnglishnameerror("Product name in English is required");
            isValid = false;
        }
        if (quantity.trim() === "") {
            setQuantityerror("Quantity is required");
            isValid = false;
        }
        if (selectedCategory === "") {
            setCategoryerror("Category is required");
            isValid = false;
        }
        if (selectedBoxUnit === "") {
            setBoxUniterror("Box Unit is required");
            isValid = false;
        }
        if (selectedBoxPrice.trim() === "") {
            setBoxPriceError("Box Price is required");
            isValid = false;
        }
        if (selectedUnit === "") {
            setUniterror("Unit is required");
            isValid = false;
        }
        if (selectedunitPrice.trim() === "") {
            setUnitPriceError("Unit Price is required");
            isValid = false;
        }

        return isValid;
    };

    const resetErrors = () => {
        setSearchError('');
        setBoxPriceError('');
        setImageError('');
    };

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                // Reset errors when navigating away from screen
                resetErrors();
            };
        }, [])
    );



    const handleSubmit = async () => {
        // Validate inputs before sending
        const isValid = Validation();
    
        if (!isValid) {
            return;
        }
    
        // Prepare data for the API request
        const postData = {
            product_name_eng: selectedProductName.trim(),
            product_name_marathi: selectedProductNameMarathi.trim(),
            sell_price_cash_per_box: selectedBoxPrice.trim(),
            sell_price_cash_per_pack: selectedunitPrice.trim(),
            category_id: selectedCategory,  // Ensure you are sending the correct category ID
            box_unit_name: selectedBoxUnit,
            unit_name: selectedUnit,
            min_qty: quantity.trim(),
            product_image: selectedImage // Include the image if required by the API
        };
    
        // Log the data to the console before sending it
        console.log('Data to be sent:', postData);
    
        try {
            // Make the POST request
            const response = await axios.post('https://demo.raviscyber.in/public/product_wise_categoryList.php', postData);
    
            // Handle successful response
            if (response.data.status === 'success') {
                console.log('Data posted successfully:', response.data);
                // Clear inputs or navigate to another screen, etc.
            } else {
                console.error('Error posting data:', response.data.message);
                setErrorMessage(response.data.message || 'Failed to post data');
            }
        } catch (error) {
            console.error('Error posting data:', error);
            setErrorMessage('Failed to post data');
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
                            handleSearch(text);
                        }}
                        value={searchInput}
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

                {/* Marathi name */}
                <Text style={styles.txt}>उत्पादनाचे मराठी नाव :</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedProductNameMarathi}
                    onChangeText={setSelectedProductNameMarathi}
                />
                {marathinameerror ? <Text style={styles.error}>{marathinameerror}</Text> : null}

                {/* English name */}
                <Text style={styles.txt}>Product Name in English:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedProductName}
                    onChangeText={setSelectedProductName}
                />
                {englishnameerror ? <Text style={styles.error}>{englishnameerror}</Text> : null}

                {/* quantity */}
                <Text style={styles.txt}>Min quantity</Text>
                <TextInput
                    style={styles.textinput1}
                    placeholder='Min quantity'
                    placeholderTextColor={'black'}
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                />
                {quantityerror ? <Text style={styles.error}>{quantityerror}</Text> : null}

                {/* Category */}
                <Text style={styles.txt}>Category :</Text>
                <SelectList
                    setSelected={setSelectedCategory}
                    data={data1}
                    placeholder={selectedCategory|| 'Select Box Unit'}
                    value={selectedCategory}
                />
                {categoryerror ? <Text style={styles.error}>{categoryerror}</Text> : null}

                {/* Box Unit */}
                <Text style={styles.txt}>Box Unit</Text>
                <SelectList
                    electList
                    setSelected={setSelectedBoxUnit}
                    data={dataBoxUnit}
                    value={selectedBoxUnit}
                    placeholder={selectedBoxUnit || 'Select Box Unit'}
                />
                {boxuniterror ? <Text style={styles.error}>{boxuniterror}</Text> : null}

                {/* sell Price of box */}
                <Text style={styles.txt}>Sell Price of box:</Text>
                <TextInput
                    style={styles.textinput1}
                    value={selectedBoxPrice}
                    onChangeText={setSelectedBoxPrice}
                />
                {boxpriceerror ? <Text style={styles.error}>{boxpriceerror}</Text> : null}


                {/* sub unit */}
                <Text style={styles.txt}>Unit</Text>
                <SelectList
                    setSelected={setSelectedUnit}
                    data={dataUnit}
                    value={selectedUnit || 'Select Box Unit'}
                    placeholder={selectedUnit}
                />
                {uniterror ? <Text style={styles.error}>{uniterror}</Text> : null}



                {/* unit price */}
                <Text style={styles.txt}>Sell Price of unit:</Text>
                <TextInput
                    style={styles.textinput1}
                    placeholder="Enter selected unit price"
                    onChangeText={setSelectedunitPrice}
                    placeholderTextColor={"black"}
                    value={selectedunitPrice}
                />
                {unitpriceerror ? <Text style={styles.error}>{unitpriceerror}</Text> : null}

                {/* Image */}
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
                {selectedImage === "" ? (
                    <Image
                        style={styles.imageStyle}
                        source={{
                            uri: 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg',
                        }}
                    />
                ) : (
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.imageStyle}
                    />
                )}
                <Text style={{ color: 'red', fontWeight: '600' }}>{imageError}</Text>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.text}>Update Product</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default EditProductScreen;

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
        borderRadius: 5
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
        width: '60%',
        height: 35,
        borderWidth: 1,
        alignSelf: 'center',
        marginLeft: '2%',
        marginTop: '5%'
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
        marginTop: '2%'
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
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },

})