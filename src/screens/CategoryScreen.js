import {
    Alert,
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AddIcon from '../components/AddIcon';
import ProductModal from '../components/ProductModel';

const CategoryScreen = ({ route,navigation }) => {
   
    const dispatch = useDispatch();
    const iconColors = useSelector(state => state.bill.iconColors);

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const searchRef = useRef();
    const [oldData, setOldData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [catModalVisible, setCatModalVisible] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setOldData(data);
        fetchData();
        fetchProd(0);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://demo.raviscyber.in/public/categorylist.php');
            const responseJson = response.data;

            if (responseJson.status === 'success') {
                setCategories(responseJson.data);
            } else {
                console.error('Error: Response status is not success');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchProd = async (id) => {
        setMoreLoading(true);
        if (id == 0) {
            try {
                const response = await axios.get('https://demo.raviscyber.in/public/category_wise_productList.php');
                setProducts(response.data);
                response.data.forEach(product => {
                    if (product.sell_price_cash_per_pack === null || product.sell_price_cash_per_box === null) {
                        
                    }
                });
                setData(response.data);
                setMoreLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        else {
            try {
                const CategoryWiseUrl = 'https://demo.raviscyber.in/public/category_wise_productList.php';

                response = await axios.post(CategoryWiseUrl, {
                    category_id: id,
                },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                res = response.data;
                setProducts(res);
                setData(res);
                setMoreLoading(false);
            } catch (error) {
                ToastAndroid.show('category issue', ToastAndroid.SHORT);
            }
        }
    }
    const searchFilterFunction = text => {
        if (text !== '') {
            let tempData = products.filter(item => {
                return item.product_name_eng.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            setProducts(tempData);
        } else {
            setProducts(oldData);
        }
    };

    const isIconColorRed = (itemId) => {
        return (iconColors[itemId] || '#23AA49') === 'red';
    };
    const renderItem1 = ({ item }) => {

        return (
            <View style={styles.listContainer}>
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={{ uri: item.product_image == "" ? 'https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png' : item.product_image }}
                        style={styles.image}
                    >
                        <AddIcon
                            onPress={() => {
                                if (!isIconColorRed(item.id)) {
                                    setSelectedItem(item);
                                    setModalVisible(true);
                                }
                                else {
                                    Alert.alert('This item is already in the bill.');
                                }
                            }}
                            color={iconColors[item.id] || '#23AA49'}
                        />
                    </ImageBackground>
                </View>
                <Text style={styles.nameText}>{item.product_name}</Text>
                {item.box_unit_name ? (
                    <Text style={styles.total}>{item.box_unit_name} Price : ₹ {item.sell_price_cash_per_box}</Text>
                ) : null}
                {item.unit_name ? (
                    <Text style={styles.total}>{item.unit_name} Price : ₹ {item.sell_price_cash_per_pack}</Text>
                ) : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.total}>Qty : 0</Text>
                    <Text style={styles.total}>Total : 0</Text>
                </View>
            </View>
        );
    };


    const dispatchCategoryWise = (id) => {
        setCatModalVisible(false);
       
        fetchProd(id);
    }

    const renderCategoryWise = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => dispatchCategoryWise(item.id)}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categotyText}>{item.category_name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const BillScreenNavigate = () => {
        navigation.navigate('BillScreen');
    }
    
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 70,
                    marginTop: 20,
                    justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        width: '80%',
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 15,
                    }}>
                    <Image
                        source={require('../assets/image/search.png')}
                        style={{ width: 24, height: 24, marginLeft: 15, opacity: 0.5 }}
                    />
                    <TextInput
                        ref={searchRef}
                        placeholder="search item here..."
                        placeholderTextColor={'black'}
                        style={{ width: '76%', height: 50, color: 'black' }}
                        value={search}
                        onChangeText={txt => {
                            searchFilterFunction(txt);
                            setSearch(txt);
                        }}
                    />
                    {search == '' ? null : (
                        <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => {
                                searchRef.current.clear();
                                searchFilterFunction('');
                                setSearch('');
                            }}>
                            <Image
                                source={require('../assets/image/close.png')}
                                style={{ width: 16, height: 16, opacity: 0.5 }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={{
                        marginRight: 15,
                    }}
                    onPress={() => {
                        setCatModalVisible(true);
                    }}>
                    <Image
                        source={require('../assets/image/filter.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            </View>

            {moreLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderItem1}
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />)}

            <ProductModal
                selectedItem={selectedItem}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                iconColors={iconColors}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={catModalVisible}
                onRequestClose={() => setCatModalVisible(false)}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,.5)',
                    }}>
                    <View
                        style={{
                            width: '80%',
                            height: '60%',
                            borderRadius: 10,
                            backgroundColor: '#fff',
                        }}>
                        <FlatList
                            data={categories}
                            renderItem={renderCategoryWise}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.addButton} onPress={BillScreenNavigate}>
                <AntDesign name="arrowright" size={25} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default CategoryScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FD',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%'
    },
    lefticon: {
        width: 30,
        height: 30,
        marginLeft: '2%',
        alignSelf: 'center',
    },
    category: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500'
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        width: "95%",
        borderBottomWidth: 1,
    },
    clearIconContainer: {
        position: 'absolute',
        right: 17,
    },
    listContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 2,
        borderRadius: 10,
        borderColor: 'black',
        borderRadius: 0.4
    },
    imageContainer: {
        margin: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    nameText: {
        color: '#000',
        fontWeight: '500',
        paddingLeft: '5%'
    },
    categoryContainer: {
        padding: 5,
        borderWidth: 0.5,
        borderTopColor: 'white',
        borderBottomColor: 'black',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        margin: 2
    },
    categotyText: {
        color: '#000',
        fontWeight: '500',
        paddingLeft: '5%',
        textAlign: 'center',
        fontSize: 18,
    },
    total: {
        color: '#000',
        paddingLeft: '5%',
        fontSize: 12.5,
        fontWeight: '400'
    },
    floatIcon: {
        position: 'absolute',
        bottom: 1,
        alignSelf: 'flex-end',
    },
    addIcon: {
        color: '#23AA49',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: '10%',
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 10,
        padding: 20,
        width: 350
    },
    product: {
        fontWeight: '500',
        fontSize: 18,
        color: 'black',
        marginTop: 20
    },
    avai: {
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    input: {
        height: 32,
        marginVertical: 10,
        padding: 5,
        width: '26%',
        borderBottomWidth: 1,
        color: 'black'
    },
    names: {
        fontSize: 15,
        paddingVertical: 5,
        color: '#000'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#23AA49',
        padding: 10,
        borderRadius: 15,
        marginTop: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'grey',

    },
    boxcontain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    types: {
        fontSize: 15,
        textAlign: 'left',
        paddingLeft: 10,
        color: '#000'
    },

    edit: {
        alignSelf: 'flex-end',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        width: '40%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignSelf: 'center',
        color: 'black'
    },
    selectedTextStyle: {
        color: 'black',
        fontSize: 15,
    },
    placeholderStyle: {
        color: 'black',
        fontSize: 14,
    },
    itemTextStyle: {
        color: 'black',
        fontSize: 16,

    },
    itemContainer: {
        // padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    list: {
        marginTop: 20,
        color: 'black',

    },
    doneButton: {
        backgroundColor: '#23AA29',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    doneButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#23AA29',
        padding: 15,
        borderRadius: 50,
    },
});

