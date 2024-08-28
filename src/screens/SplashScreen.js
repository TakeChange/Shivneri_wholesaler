import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { FetchFilterProduct, FetchProduct } from '../api/FetchProduct';

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchFilterProduct('0'));
        setTimeout(() => {
            checkSession();
        }, 2000);
    }, []);

    const checkSession = async () => {
        try {
            const value = await AsyncStorage.getItem('login');
            if (value == "yes") {
                navigation.navigate('DrawerNavigation');
            } else {
                navigation.navigate('LoginScreen');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <Image
                source={require("../../src/assets/Shivneri.png")}
                style={{ width: '45%', height: '20%', borderRadius: 90 }}
            ></Image>
        </View>
    )
}

export default SplashScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

        justifyContent: 'center'
    },
})

