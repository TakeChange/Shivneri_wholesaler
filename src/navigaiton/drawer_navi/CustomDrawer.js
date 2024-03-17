import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = (props) => {
    const { navigation } = props;
    const [uname,setUsername] = useState();

    useEffect(()=>{
        checkSession();
    },[uname]);

    const checkSession = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            setUsername(value);
        } catch (error) {
            console.log(error);
        }
    };

    const logoutSession = async () => {
        try {
            await AsyncStorage.setItem(
                'login',
                '',
            );
            ToastAndroid.show('Logout successfully.', ToastAndroid.SHORT);
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={{ backgroundColor: '#23AA49', marginBottom: '2%', padding: '5%' }}>
                <Image
                    source={require('../../assets/user-profile.jpg')}
                    style={styles.imgStyle}
                ></Image>
                <Text style={styles.nameStyle}>Hello {uname}</Text>
            </View>

            <DrawerItemList {...props} />
            <TouchableOpacity style={styles.btnStyle} onPress={logoutSession}>
                <View style={styles.shareContainer}>
                    <Ionicons name="exit-outline" size={22} color='#FF5757' />
                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 25,
                            color: '#FF5757',
                            fontWeight: '600'
                        }}>
                        Logout
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}
export default CustomDrawer
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgStyle: {
        height: 100,
        width: 90,
        borderRadius: 45
    },
    nameStyle: {
        color: 'white',
        fontSize: 18,
        marginBottom: '4%',
    },
    shareContainer: {
        flexDirection: 'row',
    },
    btnStyle: {
        marginTop: '70%',
        padding: '5%'
    }
})
