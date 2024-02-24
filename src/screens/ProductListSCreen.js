import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductMethod } from '../redux/product/productAction';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const getProd = useSelector(state => state.ProductReducer);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProduect();
    }, []);

    const getProduect = async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            dispatch(getProductMethod(data));
            setLoading(false); // Stop the loading indicator
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Stop the loading indicator even if there's an error
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <Text style={styles.nameText}>{item.title}</Text>
                <Text style={styles.total}>BoxPrice: {item.price}</Text>
                <Text style={styles.total}>Qty: {item.rating.count}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.total}>Total: {item.price}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={getProd}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default ProductListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    listContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 8,
        borderRadius: 10,
    },
    imageContainer: {
        margin: 15,
        borderRadius: 10,
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
        marginLeft: 5
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
