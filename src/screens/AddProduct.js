import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

const AddProduct = () => {
    const [filePath, setFilePath] = useState();
    const [productname, setProductname] = useState('');
    const [boxprice, setBoxPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [total, setTotal] = useState('');

    const addProd = () => {
        console.log(productname);
        console.log(boxprice);
        console.log(quantity);
        console.log(total);
    }

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
           // console.log('Response1 = ', response);

            if (response.didCancel) {
                //alert('User cancelled image picker');
                return;
            } else {
                const imageURI = response.assets[0].uri;
                console.log(imageURI);
                setFilePath(imageURI);
            }
        });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.All}>
                    <Text style={styles.name}>Enter Product Name :</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setProductname(text)}
                    />
                    <Text style={styles.name}>Enter Box Price :</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setBoxPrice(text)}
                    />
                    <Text style={styles.name}>Quantity :</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setQuantity(text)}
                    />
                    <Text style={styles.name}>Total :</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setTotal(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={styles.Upload}>Upload Product Image :</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.buttonStyle}
                            onPress={() => chooseFile('photo')}>
                            <Text style={styles.img}>Choose Image</Text>
                        </TouchableOpacity>
                    </View>
                    <Text></Text>
                    <Image
                        source={{ uri: filePath }}
                        style={styles.imageStyle}
                    />
                </View>

                <TouchableOpacity
                    style={styles.addBut}
                    onPress={addProd}
                >
                    <Text style={styles.img}>Add Product</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    All: {
        marginTop: '13%',
    },
    name: {
        color: '#000',
        marginLeft: '5%',
        marginBottom: "1%",
        fontWeight: '700'
    },
    input: {
        height: 30,
        alignSelf: 'center',
        borderBottomWidth: 1,
        padding: '2%',
        width: '90%',
        justifyContent: 'flex-end',
        fontSize: 15,
        marginBottom: '5%'
    },
    Upload: {
        color: '#000',
        fontWeight: '700',
        marginTop: '2%'
    },
    img: {
        fontWeight: '700',
        alignSelf: 'center',
        color: "#FFF"
    },
    buttonStyle: {
        backgroundColor: '#23AA49',
        padding: 8,
        width: '35%',
        borderRadius: 15
    },
    imageStyle: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    addBut: {
        backgroundColor: '#23AA49',
        padding: 15,
        width: '80%',
        alignSelf: 'center',
        marginTop: '10%',
        borderRadius: 25
    }
});