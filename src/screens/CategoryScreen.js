import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import data from '../utils/data';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Modal } from 'react-native';
import DropDown from '../components/DropdownComponent';
import Icon from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign'


const CategoryScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.listContainer}>
                <View style={styles.imageContainer}>
                    <Image source={item.image}
                        style={styles.image} />
                </View>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.total}>{item.Qty}</Text>
                <Text style={styles.total}>{item.BoxPrice}</Text>
                <Text style={styles.total}>{item.Total}</Text>
                <View style={styles.floatIcon}>
                    <TouchableOpacity>
                        <Ionicons name='add-circle' size={38}
                            style={styles.addIcon}
                            onPress={() => setModalVisible(true)} />
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.cross}>
                                <Text style={styles.product}>PRODUCT :</Text>
                                <TouchableOpacity>
                                    <Icon style={styles.icon} name="close" size={30} onPress={() => { setModalVisible(!modalVisible) }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.avai}>
                                <Text style={styles.names}>Available Box :</Text>
                                <View style={styles.boxcontain}>
                                    <Text style={styles.names}>Type :</Text>
                                    <DropDown />
                                    <Text style={styles.types}>Qty :</Text>
                                    <TextInput
                                        style={styles.input}
                                    />
                                </View>
                            </View>

                            <View style={styles.avai}>

                                <View style={styles.boxcontain}>
                                    <Text style={styles.names}>PerPrice :</Text>
                                    <TextInput
                                        style={styles.input}
                                    />
                                    <Text style={styles.names}>Total:</Text>
                                    <TextInput
                                        style={styles.input}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.button}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>DONE</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </View>

        )
    }




    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('')}>
                <AntDesign name="arrowright" size={25} color="white" />
            </TouchableOpacity>
        </View>
    );
};


export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#F7F9FD',

    },
    listContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 8,
        borderRadius: 10,
    },
    imageContainer: {
        margin: 15,
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
    },
    boxcontain: {
        flexDirection: 'row',
    },
    product: {
        fontWeight: '500',
        fontSize: 20,
        color: 'white',
        padding: '1%',
        marginBottom: 2
    },
    avai: {
        backgroundColor: '#fff',
        margin: '5%',
    },
    input: {
        height: 32,
        margin: 10,
        padding: '2%',
        width: '26%',
        borderBottomWidth: 1,
    },
    names: {
        fontSize: 15,
        padding: 5,
        paddingTop: '5%',
        color: '#000'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#23AA49',
        padding: '2%',
        margin: '8%',
        borderRadius: 15
    },
    icon: {
        color: "#fff",
        paddingLeft: '58%',
    },
    cross: {
        flexDirection: 'row',
        backgroundColor: '#23AA49',
    },
    types: {
        fontSize: 15,
        textAlign: 'left',
        paddingLeft: '12%',
        paddingTop: '5%',
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

})