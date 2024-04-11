import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import DrawerNavigation from './drawer_navi/DrawerNavigation';
import LoginScreen from '../screens/LoginScreen';
import CategoryScreen from '../screens/CategoryScreen';
import BillScreen from '../screens/BillScreen';
import CheckInternet from '../components/CheckInternet';
const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="DrawerNavigation"
                    component={DrawerNavigation}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="CategoryScreen"
                    component={CategoryScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="BillScreen"
                    component={BillScreen}
                    options={{ headerShown: true }}
                />
                
            </Stack.Navigator>

            <CheckInternet

                name="checkinternet"
                component={CheckInternet}
                options={{ headerShown: false }}
            />
        </NavigationContainer>
    );
};

export default AppNavigation;
