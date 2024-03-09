import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import data from '../utils/data';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const CategoryScreen = ({ navigation }) => {
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
                        <Ionicons name='add-circle' size={38} style={styles.addIcon} />
                    </TouchableOpacity>
                </View>

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
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#23AA29',
        padding: 15,
        borderRadius: 50,
    },

})