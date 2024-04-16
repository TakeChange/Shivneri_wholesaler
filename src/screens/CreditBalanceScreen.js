import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'


const CreditBalanceScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.custnameview}>

                    <Text style={styles.custtext}>Customer name</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default CreditBalanceScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        padding: 10
    },

    ///////serach
    custnameview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //marginVertical: '6%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    custtext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',

    },
    /////////
})