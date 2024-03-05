// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from '../../screens/home/HomeScreen';
// import CustomDrawer from './CustomDrawer';

// const Drawer = createDrawerNavigator();

// const DrawerNavigation = () => {
//     return (
//         <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>

//             <Drawer.Screen
//                 name="HomeScreen"
//                 component={HomeScreen}
//                 options={{ headerShown: true }}
//             />

//         </Drawer.Navigator>
//     );
// };

// export default DrawerNavigation;


import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../../screens/home/HomeScreen';
import OrderHistoryScreen from '../../screens/OrderHistoryScreen';
import OrderHistoryVehicleScreen from '../../screens/OrderHistoryVehicleScreen';
import ProductRunningScreen from '../../screens/ProductRunningScreen';
import SettingScreen from '../../screens/SettingScreen';


const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}>

      < Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <FontAwesome name='home' size={22} color='#000'
              style={{ height: 25, width: 25, }} />
          ),
        }}
      />
      < Drawer.Screen
        name="Order History(Counter)"
        component={OrderHistoryScreen}
        options={{
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
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






