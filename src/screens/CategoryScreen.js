import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import data from '../utils/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDown from '../components/DropdownComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LeftArrow from 'react-native-vector-icons/AntDesign';
import Search from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

const CategoryScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (text) => {
        setSearchQuery(text);
    };
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    const clearSearch = () => {
        setSearchQuery('');
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <TouchableOpacity style={styles.edit}>
                    <FontAwesome name='edit' size={20} style={{ color: '#23AA49' }} />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.total}>{item.Qty}</Text>
                <Text style={styles.total}>{item.BoxPrice}</Text>
                <Text style={styles.total}>{item.Total}</Text>
                <TouchableOpacity style={styles.floatIcon} onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
                    <Ionicons name='add-circle' size={38} style={styles.addIcon} />
                </TouchableOpacity>
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
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
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
                                        <DropDown />
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
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('BillScreen')}>
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
        width:"95%",
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
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    total: {
        color: 'red',
        fontWeight: '500',
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
    }
});
