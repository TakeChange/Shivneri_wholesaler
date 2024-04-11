import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const CheckInternet = () => {
    const [isConnected, setIsConnected] = useState(true);

    const checkInternetConnection = async () => {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected);
    };

    useEffect(() => {
        checkInternetConnection();

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    const handleRetry = () => {
        checkInternetConnection();
    };

    return !isConnected ? (
        <View style={styles.container}>
            <View style={styles.popup}>
                <Text style={styles.boldText}>No Connection</Text>
                <Text style={styles.message}>Please check your internet connectivity</Text>
                <Text style={styles.message}>and try again</Text>
                <TouchableOpacity>
                    <View style={{ marginTop: '10%' }}>
                        <Button title="Retry" onPress={handleRetry} />
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        backgroundColor: '#fff',
        color: 'red',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        maxWidth: '100%',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '4%',
    },
    message: {
        color: '#000',
    },
});

export default CheckInternet;