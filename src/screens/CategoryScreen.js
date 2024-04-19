import {
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
const CategoryScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const [oldData, setOldData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [catModalVisible, setCatModalVisible] = useState(false);
    const Product_list = useSelector((state) => state.product?.data);
    const moreLoading = useSelector((state) => state.product?.isLoader);

    const data1 = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
    ];

    useEffect(() => {
        setData(Product_list);
        setOldData(Product_list);
    }, []);

    const searchFilterFunction = text => {
        if (text !== '') {
            let tempData = data.filter(item => {
                return item.product_name_eng.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            console.log('tempData', tempData)
            setData(tempData);
        } else {
            setData(oldData);
        }
    };

    const renderItem1 = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <View style={styles.imageContainer}>
                    <ImageBackground source={{ uri: item.product_image == ""? 'https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png' : item.product_image }} style={styles.image}>
                        <TouchableOpacity style={styles.floatIcon} onPress={() => { setSelectedItem(item); setModalVisible(true);()=>console.log('Image Path:',item.product_image)}}>
                            <Ionicons name='add-circle' size={38} style={styles.addIcon} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <Text style={styles.nameText}>{item.product_name}</Text>
                <Text style={styles.total}>{item.unit_type} Price : {item.total_price}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.total}>Qty : 0</Text>
                    <Text style={styles.total}>Total : 0</Text>
                </View>
            </View>
        );
    };

    const renderCategoryWise = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => setCatModalVisible(false)}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categotyText}>{item.product_name}</Text>
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
                    data={data}
                    renderItem={renderItem1}
                    keyExtractor={item => item.product_id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />)}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={30} />
                        </TouchableOpacity>
                        {selectedItem && (
                            <>
                                <Text style={styles.product}>PRODUCT: {selectedItem.name}</Text>
                                <View style={styles.avai}>
                                    <Text style={styles.names}>Available Box:</Text>
                                    <View style={styles.boxcontain}>
                                        <Text style={styles.names}>Type:</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            data={data1}
                                            maxHeight={100}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select unit type"
                                            value={data}
                                            onChange={item => {
                                                setSelectedUnitType(item.value);
                                            }}
                                        />
                                        <Text style={styles.types}>Qty:</Text>
                                        <TextInput style={styles.input} />
                                    </View>
                                </View>
                                <View style={styles.avai}>
                                    <View style={styles.boxcontain}>
                                        <Text style={styles.names}>PerPrice:</Text>
                                        <TextInput style={styles.input} />
                                        <Text style={styles.names}>Total:</Text>
                                        <TextInput style={styles.input} />
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>DONE</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

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
                            data={data}
                            renderItem={renderCategoryWise}
                            keyExtractor={item => item.product_id}
                            numColumns={1}
                            showsVerticalScrollIndicator={false}
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
        paddingLeft: '5%'
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
    },
    product: {
        fontWeight: '500',
        fontSize: 20,
        color: 'black',
        marginBottom: 10
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
        backgroundColor: 'grey'
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
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#23AA29',
        padding: 15,
        borderRadius: 50,
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
        width: '50%',
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
        color: '#000',
        fontSize: 14,
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
});
