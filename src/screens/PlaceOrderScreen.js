import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const PlaceOrderScreen = () => {
    const [total, setTotal] = useState('');
    const [extraCharges, setExtraCharges] = useState('');
    const [discount, setDiscount] = useState('');
    const [grandTotal, setGrandTotal] = useState('');
    const [paymentType, setPaymentType] = useState('');

    const data = [
        { label: 'Cash' },
        { label: 'Debit card' },
        { label: 'Credit card' },
    ];

    // const placeOrder = () => {
    //     Alert.alert(
    //         'Place Your Order',
    //         'Are you sure you want to place your order?',
    //         [
    //             {
    //                 text: 'No',
    //                 style: 'cancel',

    //             },
    //             {
    //                 text: 'Yes',
    //                 onPress: () => {

    //                     console.log('Order placed successfully!');
    //                 },
    //             },
    //         ],
    //         { cancelable: false }
    //     );
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Place Order</Text>
            <View style={styles.orderDetails}>
                <Text style={styles.text}>Total:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={total}
                    onChangeText={text => setTotal(text)}
                />

                <Text style={styles.text}>Extra Charges:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={extraCharges}
                    onChangeText={text => setExtraCharges(text)}
                />

                <Text style={styles.text}>Discount:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={discount}
                    onChangeText={text => setDiscount(text)}
                />

                <Text style={styles.text}>Grand Total:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={grandTotal}
                    onChangeText={text => setGrandTotal(text)}
                />

                <Text style={styles.text}>payment Type:</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}

                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select payment type"
                    searchPlaceholder="Search..."
                    value={paymentType}
                    onChange={item => {
                        setPaymentType(item.value);
                    }}
                />

                <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '10%',
    },
    text: {
        fontWeight: 'bold',
        color: '#000'
    },
    orderDetails: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        marginBottom: '3%',
        borderColor: '#000',
        padding: 6,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    dropdown: {
        padding: '7%',
        height: '7%',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeOrderButton: {
        backgroundColor: '#23AA49',
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',
        borderRadius: 40
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#000'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000'
    },
    inputSearchStyle: {
        fontSize: 16,

    },
});

export default PlaceOrderScreen;


