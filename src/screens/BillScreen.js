import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Image, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Delete from 'react-native-vector-icons/Entypo';
import Dec from '../components/Dec';
import Inc from '../components/Inc';
import { ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { addToBill, removeFromBill, updateItemQuantity } from '../redux_toolkit/Bill_list/billSlice';
//import { } from '../redux_toolkit/product_list/Productslice'

const BillScreen = ({ navigation }) => {

    const Product_list = useSelector((state) => state.product.data) || [];
    //console.log('Selected Items:', Product_list);
    const [productModalVisible, setProductModalVisible] = useState(false);
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const billItems = useSelector(state => state.bill.items);
    const selectedUnitType = useSelector(state => state.bill.selectedUnitType);
    console.log('Selected Items:', billItems);

    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [key, setKey] = useState(Date.now());

    useEffect(() => {
        calculateTotal();
    }, [billItems]);

    const handleSearch = text => {
        setSearch(text);
        if (text.trim() === '') {
            setData([]);
        } else {
            const filtered = Product_list.filter(item =>
                item.product_name_eng.toLowerCase().includes(text.toLowerCase())
            );
            setData(filtered);
        }
    };

    const renderItem1 = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(`${item.product_name_eng} `)}>
            <View style={{marginHorizontal:10,}}>
                <Text style={{color:'black',fontSize:15,fontWeight:'700',marginVertical:12}}>
                {`${item.product_name_eng}`}
                </Text>
                <View style={styles.separator}/>
            </View>
        </TouchableOpacity>
    );

    const handleItemClick = itemName => {
        setSearch(itemName);
        handleSearch(itemName);
    };

    const clearSearch = () => {
        setSearch('');
        setData([]);
    };

    const calculateTotal = () => {
        let total = 0;
        billItems.forEach(item => {
            total += parseFloat(item.total);
        });
        setTotalAmount(total);
    };

    const handleClick1 = (index) => {
        const item = billItems[index];
        const newQuantity = parseInt(item.quantity, 10) + 1;
        dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    };

    const handleClick2 = (index) => {
        const item = billItems[index];
        const newQuantity = Math.max(parseInt(item.quantity, 10) - 1, 1);
        dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    };
    const handleRemoveItem = (item) => {
        dispatch(removeFromBill(item.id)); // Remove item from bill
    };
    const Product = ({ item, index }) => {
        const [total, setTotal] = useState(parseFloat(item.total).toFixed(2));

        useEffect(() => {
            setTotal(parseFloat(item.quantity * item.perPrice).toFixed(2));
        }, [item.quantity, item.perPrice]);

        return (
            <View style={styles.BillList}>

                <View style={styles.head}>
                    <Text style={styles.productNameText}>Product : {item.product_name}</Text>
                    <TouchableOpacity style={styles.flatdeleteicon} onPress={() => dispatch(removeFromBill(item.id))}>
                        <Delete name='cross' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: item.product_image || 'https://via.placeholder.com/150' }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailText}>Type: {item.selectedUnitType}</Text>
                        <Text style={styles.detailText}>Price: ₹{item.perPrice}/-</Text>
                        <Text style={styles.detailText}>Total: ₹{total}/-</Text>

                        <View style={styles.IncDcr}>
                            <Inc onPress1={() => handleClick1(index)} />
                            <View style={styles.quantityContainer}>
                                <Text style={styles.detailText}>{item.quantity}</Text>
                            </View>
                            <Dec onPress2={() => handleClick2(index)} />
                        </View>
                    </View>
                </View>

            </View>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen')}>
                        <Icon name="arrow-back" size={25} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Bill</Text>
                    <TouchableOpacity onPress={() => setProductModalVisible(true)}>
                        <Icon name="search" size={25} color="black" />
                    </TouchableOpacity>

                </View>
                <View style={styles.custnameview}>
                    <Text style={styles.custtext}>Customer name</Text>
                </View>
                <View style={styles.penview}>
                    <Text style={styles.pendingText}>Pending:000000</Text>
                </View>

                <FlatList
                    key={key} // Pass key to FlatList
                    data={billItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <Product item={item} index={index} />}
                />
                {billItems != '' && (
                    <>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total : ₹{totalAmount}/-</Text>
                        </View><TouchableOpacity style={styles.btn}>
                            <Text style={styles.text}>Order Now</Text>
                        </TouchableOpacity>
                    </>
                )}
                {/* Product Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={productModalVisible}
                    onRequestClose={() => setProductModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.search}>
                                <TextInput
                                    placeholder="Search Product Name"
                                    placeholderTextColor={'#ccc'}
                                    style={styles.searchInput}
                                    onChangeText={handleSearch}
                                    value={search}
                                />
                                {search.length > 0 && (
                                    <TouchableOpacity onPress={clearSearch}>
                                        <Icon name="close" size={25} color="black" style={styles.clearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <FlatList
                                data={data.length > 0 ? data : Product_list}
                                renderItem={renderItem1}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default BillScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  paddingHorizontal: 15,
        //paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        //paddingHorizontal: 15,
        padding: 10,
        height: 60,

    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    custnameview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    custtext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    penview: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    pendingText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 15,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginHorizontal:10

    },
    searchIcon: {
        padding: 10,
    },
    searchInputContainer: {
        flex: 1,
    },
    searchInput: {
        paddingHorizontal: 10,
        color: 'black',
    },
    clearIcon: {
        marginHorizontal: 10,
    },
    BillList: {
        height: 180,
        marginVertical: 10,
        borderColor: '#23AA49',
        borderWidth: 1,
        marginHorizontal:10
    },
    head: {
        backgroundColor: '#23AA49',
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8,
    },
    productNameText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imageContainer: {
        height: '60%',
        flexDirection: 'row',
    },
    imageWrapper: {
        width: '40%',
        height: 138,
        backgroundColor: 'red',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    detailsContainer: {
        width: '60%',
        padding: 5,

    },
    detailText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 13,
        margin: 3
    },
    IncDcr: {
        flexDirection: 'row',
        borderColor: '#23AA49',
        borderWidth: 1.5,
        width: '60%',
        justifyContent: 'space-between',
        borderRadius: 60 / 2,
        height: '34%',
        top: 6
    },
    quantityContainer: {
        marginHorizontal: '6%',
    },
    quantityText: {
        color: 'black',
    },
    totalContainer: {
        marginTop: '5%',
        alignItems: 'flex-end',
    },
    totalText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#23AA49',
        marginHorizontal: 10,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: '8%',
        marginBottom: '10%',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
       // padding: 20,
        maxHeight: '60%',
        justifyContent: 'space-between'
    },
    separator: {
        height: 1,          
        backgroundColor: 'black', 
        marginVertical: 1,
        width: '100%',  
    },

});
