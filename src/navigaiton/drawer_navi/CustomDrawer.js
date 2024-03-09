import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>

            <View style={{ backgroundColor: '#23AA49', marginBottom: '2%', padding: '5%' }}>
                <Image
                    source={require('../../assets/user-profile.jpg')}
                    style={styles.imgStyle}
                ></Image>
                <Text style={styles.nameStyle}>Hello EveryOne!...</Text>
            </View>

            <DrawerItemList {...props} />
            <TouchableOpacity style={styles.btnStyle}>
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
