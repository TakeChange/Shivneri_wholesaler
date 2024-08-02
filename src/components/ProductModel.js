import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { addToBill } from '../redux_toolkit/Bill_list/billSlice';

const ProductModal = ({ selectedItem, modalVisible, setModalVisible }) => {
    const dispatch = useDispatch();
    const billItems = useSelector(state => state.bill.items);

    const [selectedUnitType, setSelectedUnitType] = useState(null);
    const [perPrice, setPerPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const calculateTotal = (qty, price) => {
        const total = parseFloat(qty) * parseFloat(price);
        return isNaN(total) ? '' : total.toFixed(2).toString();
    };

    const handleQtyChange = (text) => {
        setQuantity(text);
        if (text && perPrice) {
            const totalValue = calculateTotal(text, perPrice);
            setTotal(totalValue);
        } else {
            setTotal('');
        }
    };

    const handleDone = () => {
        if (!quantity || !perPrice || !total || !selectedUnitType) {
            setErrorMessage('Please fill all fields');
        } else {
            const existingItem = billItems.find(item => 
                item.product_name === selectedItem.product_name  
              
            );

            if (existingItem) {
                Alert.alert('Item Already in Bill', 'This item is already in the bill.');
            } else {
                setErrorMessage('');
                const newItem = {
                    ...selectedItem,
                    selectedUnitType: selectedUnitType === 'box_unit_name' ? selectedItem.box_unit_name : selectedItem.unit_name,
                    perPrice,
                    quantity,
                    total,
                };
                dispatch(addToBill(newItem));

                setQuantity('');
                setTotal('');
                setSelectedUnitType(null);
                setModalVisible(false);
            }
        }
    };

    const handleClose = () => {
        setErrorMessage('');
        setQuantity('');
        setTotal('');
        setSelectedUnitType(null);
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Ionicons name="close" size={30} />
                    </TouchableOpacity>
                    {selectedItem && (
                        <>
                            <Text style={styles.product}>PRODUCT: {selectedItem.product_name}</Text>
                            <View style={styles.avai}>
                                <View style={styles.boxcontain}>
                                    <Text style={styles.names}>Type:</Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        itemTextStyle={styles.itemTextStyle}
                                        data={[
                                            { label: selectedItem?.box_unit_name, value: 'box_unit_name' },
                                            { label: selectedItem?.unit_name, value: 'unit_name' }
                                        ]}
                                        maxHeight={100}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Select unit"
                                        value={selectedUnitType}
                                        onChange={item => {
                                            setSelectedUnitType(item.value);
                                            if (item.value === 'box_unit_name') {
                                                setPerPrice(selectedItem.sell_price_cash_per_box);
                                            } else if (item.value === 'unit_name') {
                                                setPerPrice(selectedItem.sell_price_cash_per_pack);
                                            }
                                            setQuantity('');
                                            setTotal('');
                                        }}
                                    />
                                    <Text style={styles.types}>Qty:</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={handleQtyChange}
                                        value={quantity}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            <View style={styles.avai}>
                                <View style={styles.boxcontain}>
                                    <Text style={styles.names}>Per Price:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={quantity !== '' && perPrice ? perPrice.toString() : ''}
                                        editable={false}
                                    />
                                    <Text style={styles.names}>Total:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={total ? total.toString() : ''}
                                        editable={false}
                                    />
                                </View>
                            </View>
                            {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
                            <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: '10%',
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 10,
        padding: 20,
        width: 350,
    },
    product: {
        fontWeight: '500',
        fontSize: 18,
        color: 'black',
        marginTop: 20
    },
    avai: {
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    input: {
        height: 32,
        marginVertical: 10,
        padding: 5,
        width: '26%',
        borderBottomWidth: 1,
        color: 'black'
    },
    names: {
        fontSize: 15,
        paddingVertical: 5,
        color: '#000'
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'grey',
    },
    boxcontain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    types: {
        fontSize: 15,
        textAlign: 'left',
        paddingLeft: 10,
        color: '#000'
    },
    dropdown: {
        width: '40%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignSelf: 'center',
        color: 'black',
      
    },
    selectedTextStyle: {
        color: 'black',
        fontSize: 15,
    },
    placeholderStyle: {
        color: 'black',
        fontSize: 14,
    },
    itemTextStyle: {
        color: 'black',
        fontSize: 16,
    },
    doneButton: {
        backgroundColor: '#23AA29',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    doneButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default ProductModal;
