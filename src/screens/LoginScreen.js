import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import User from 'react-native-vector-icons/FontAwesome'
import LeftArrow from 'react-native-vector-icons/Entypo'
import Eye from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [username, setUsername] = useState('');
    const [userError, setUserError] = useState('');



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const Validation = () => {
        var isValid = true;
        if (username == '') {
            setUserError('Username do not empty');
            isValid = false;
        } else {
            setUserError('');
        }

        if (password == '') {
            setPasswordError('Password do not empty');
            isValid = false;
        } else {
            setPasswordError('');
        }
        if (isValid) {
            if (username == "pritish" && password == "pritish") {
                setUserError('');
                ToastAndroid.show('Login successfully!!!', ToastAndroid.SHORT);
                setSession();
                navigation.navigate('DrawerNavigation');
            } else {
                setUserError('Please enter valid username and password');
            }
        }
    }

    const setSession = async () => {
        try {
            await AsyncStorage.setItem(
                'login',
                'yes',
            );
            const value = await AsyncStorage.getItem('login');
            if (value !== null) {
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity style={styles.lefticon}>
                        <LeftArrow
                            name='chevron-small-left'
                            size={35}
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.logo}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo1}
                    />
                </View>
                <View style={{ marginHorizontal: 10, alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>LOGIN HERE</Text>
                </View>
                <View style={styles.container1}>
                    <View style={styles.icon}>
                        <User
                            name="user"
                            size={25}
                            color='black'
                        />
                    </View>
                    <View style={styles.separator} />
                    <TextInput
                        style={styles.inputField}
                        placeholder="Username"
                        placeholderTextColor="#999"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
                <Text style={styles.error}>{userError}</Text>

                <View style={styles.container1}>
                    <View style={styles.icon}>
                        <User
                            name="lock"
                            size={26}
                            color='black'
                        />
                    </View>
                    <View style={styles.separator} />
                    <TextInput
                        style={styles.inputField}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ padding: 5 }}>
                        <Eye
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={25}
                            color='black'
                        />
                    </TouchableOpacity>

                </View>
                <Text style={styles.error}>{passwordError}</Text>
                <TouchableOpacity style={styles.btn} onPress={Validation}>
                    <Text style={styles.text}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%',
        //backgroundColor:'red'
    },

    lefticon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40 / 2,
        borderColor: '#ccc',
        borderWidth: 1
    },
    logo: {
        height: 100,
        marginTop: '15%',

    },
    logo1: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    },
    input: {
        height: 50,
        marginHorizontal: 10,
        outline: 'none',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 10,
        fontSize: 15,
        fontWeight: '800',
        // marginTop: '14%',
        backgroundColor: '#F3F5F7',
        borderRadius: 12,
        //borderWidth: 1,
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        //borderWidth: 1,
        //borderColor: '#ccc',
        marginHorizontal: 10,
        marginTop: '8%'

    },
    icon: {
        padding: 10,
        //backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },

    inputField: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        outline: 'none',
    },
    separator: {
        height: '80%', // Adjust the height as needed
        width: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 1,

    },
    btn: {
        backgroundColor: '#23AA49',
        marginHorizontal: 10,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: '18%'
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    error: {
        color: 'red',
        marginHorizontal: 10,
        marginTop: '1%'
    }
});


