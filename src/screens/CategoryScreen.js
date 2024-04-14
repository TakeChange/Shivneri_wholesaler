import React, {useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LeftArrow from 'react-native-vector-icons/AntDesign';
import Search from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';

const CategoryScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false); 
    const [selectedItem, setSelectedItem] = useState(null); 
    const [showSearch, setShowSearch] = useState(false); 
    const [searchQuery, setSearchQuery] = useState('');
    const Product_list = useSelector((state) => state.product.data?.data);
    const moreLoading = useSelector((state) => state.product?.isLoader);

    const handleSearch = (text) => {
        setSearchQuery(text); 
    };
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    const clearSearch = () => {
        setSearchQuery('');
    };

    const BillScreenNavigate = () => {
        navigation.navigate('BillScreen');
    }

    const renderItem2 = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>{item.label}</Text>
        </View>
    );

    const renderItem1 = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <View style={styles.imageContainer}>
                    <ImageBackground source={require('../assets/chilli.jpg')} style={styles.image}>
                        <TouchableOpacity style={styles.edit}>
                            <FontAwesome name='edit' size={20} style={{ color: '#23AA49' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.floatIcon} onPress={() => { setSelectedItem(item); setModalVisible(true);}}>
                            <Ionicons name='add-circle' size={38} style={styles.addIcon} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <Text style={styles.nameText}>{item.product_name_eng}</Text>
                <Text style={styles.total}>{item.Qty}</Text>
                <Text style={styles.total}>{item.BoxPrice}</Text>
                <Text style={styles.total}>{item.Total}</Text>
                <TouchableOpacity style={styles.floatIcon} onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
                    <Ionicons name='add-circle' size={38} style={styles.addIcon} />
                </TouchableOpacity> 
                <Text style={styles.total}>{item.unit_type} Price : {item.total_price}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.total}>Qty : 0</Text>
                    <Text style={styles.total}>Total : 0</Text>
                </View>
            </View>
        );     
    };   
     
    return (  
        <View style={styles.container}>
            <View style={styles.header}>
                {!showSearch && (
                    <>
                        <TouchableOpacity style={styles.lefticon}>
                            <LeftArrow
                                name='arrowleft'
                                size={30}
                                color='black'
                            />
                        </TouchableOpacity>
                        <Text style={styles.category}>Category Screen</Text>

                    </>
                )}
                {showSearch && (
                    <View style={styles.searchContainer}>
                        <TouchableOpacity style={styles.lefticon}> 
                            <LeftArrow
                                name='arrowleft' 
                                size={30}
                                color='black'  
                                onPress={toggleSearch} 
                            />
                        </TouchableOpacity> 
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.searchInput} 
                                placeholder="Search...."
                                onChangeText={handleSearch}
                                value={searchQuery}
                                autoFocus={true}
                            />
                            {searchQuery !== '' && (
                                <TouchableOpacity style={styles.clearIconContainer} onPress={clearSearch}>
                                    <Icon name='close' size={20} color='#000' />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                )}
                {!showSearch && (
                    <TouchableOpacity onPress={toggleSearch}>
                        <Search
                            name='search'
                            size={30}
                            color='#000'
                            marginRight='2%'
                        />
                    </TouchableOpacity >
                )}
                <TouchableOpacity onPress={() => setShowListing(!showListing)}>
                    <Ionicons
                        name='filter'
                        size={30}
                        color='black'
                        marginRight='2%'
                    />
                </TouchableOpacity>
                {showListing && (
                <FlatList
                    data={data}
                    renderItem={renderItem2}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
            )}
            </View>
            {moreLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={Product_list}
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
                                            data={unitTypeOptions} 
                                            maxHeight={100}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select unit type"
                                            value={selectedUnitType}
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
        margin: 8,
        borderRadius: 10,
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
        color:'black'
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
        // Styles for each list item
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
         
    }, 
    list: {
        marginTop: 20,
        
    },


});
