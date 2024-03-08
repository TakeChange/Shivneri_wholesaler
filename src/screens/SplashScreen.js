import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => { 
            navigation.navigate('LoginScreen');
        }, 2000);
    }, []);
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/icons/pan.png")}
                style={{ width: '35%', height: '18%', borderRadius: 90 }}
            ></Image>
        </View>
    )
}

export default SplashScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#23AA49',
        justifyContent: 'center'
    },
})

