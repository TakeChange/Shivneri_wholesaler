import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../../screens/home/HomeScreen';
import OrderHistoryScreen from '../../screens/OrderHistoryScreen';
import OrderHistoryVehicleScreen from '../../screens/OrderHistoryVehicleScreen';
import ProductRunningScreen from '../../screens/ProductRunningScreen';
import SettingScreen from '../../screens/SettingScreen';
import CategoryScreen from '../../screens/CategoryScreen';
import AddProduct from '../../screens/AddProduct';
import CreditBalanceScreen from '../../screens/CreditBalanceScreen';
import EditProductScreen from '../../screens/EditProductScreen';
import FlatlistDemo from '../../screens/FlatListDemo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}>

      < Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <FontAwesome name='home' size={22} color='#000'
              style={{ height: 25, width: 25, }} />
          ),
        }}
      />
      <Drawer.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          headerShown: true,
          title: 'AddProduct',
          drawerIcon: ({ focused, size }) => (
            <Ionicons name='bag-add' size={22} color='#000'
              style={{ height: 25, width: 25, }} />
          ),
        }}
      />
      <Drawer.Screen
        name="CustomerMaster"
        component={CreditBalanceScreen}
        options={{
          headerShown: true,
          title: 'Customer Master',
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5 name='user-edit' size={20} color='#000'
              style={{ height: 22, width: 25,}} />
          ),
        }}
      />
      <Drawer.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{
          headerShown: true,
          title: 'Product Master',
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name='book-edit' size={22} color='#000'
              style={{ height: 25, width: 25, }} />
          ),
        }}
      />
      < Drawer.Screen
        name="Order History(Counter)"
        component={OrderHistoryScreen}
        options={{
          headerShown: true,
          title: 'Order History(Counter)',
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name='countertops' size={22} color='#000'
              style={{ height: 25, width: 25, }} />
          ),
        }}
      />
      < Drawer.Screen
        name="Order History(Vehicle)"
        component={OrderHistoryVehicleScreen}
        options={{
          headerShown: true,
          title: 'Order History(Vehicle)',
          drawerIcon: ({ focused, size }) => (
            <Entypo name='text-document' size={22} color='#000'
              style={{ height: 25, width: 25, }} />
          ),
        }}
      />
      < Drawer.Screen
        name="ProductRunningOutofStock"
        component={ProductRunningScreen}
        options={{
          headerShown: true,
          title: 'Product Out of Stock',
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name='cart-remove' size={22} color='#000'
              style={{ height: 25, width: 25, }} />
          ),
        }}
      />

      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: true,
          title: 'Setting',
          drawerIcon: ({ focused, size }) => (
            <AntDesign name='setting' size={22} color='#000'
              style={{ height: 25, width: 25, }} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}
export default DrawerNavigation;






