import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DrawerNavigation');
        }, 2000);
    }, []);

    return (
        <View>
            <Text>Splash</Text>
        </View>
    );
};

export default SplashScreen;
