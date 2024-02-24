import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/home/HomeScreen';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>

            <Drawer.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: true }}
            />

        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
