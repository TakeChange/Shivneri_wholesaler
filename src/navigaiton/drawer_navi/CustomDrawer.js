// import {View, Text, SafeAreaView, FlatList, Image} from 'react-native';
// import React from 'react';
// import CommonCard from '../../components/CommonCard';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const data = [
//   {
//     title: 'Starred',
//     icon: require('../../assets/icons/star.png'),
//     isNew: false,
//     count: 2,
//   },
//   {
//     title: 'Snoozed',
//     icon: require('../../assets/icons/star.png'),
//     isNew: false,
//     count: 2,
//   },
  

// ];
// const CustomDrawer = ({navigation}) => {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//          <View style={{flexDirection: 'row', backgroundColor: '#57c2f2', padding: '5%'}}>
//                   <Image
//                     source={require('../../assets/icons/star.png')}
//                     style={{height: 100, width: 50, borderRadius: 40, marginBottom: 10}}
//                     resizeMode='contain'
//                   />
//                   <View style={{ marginLeft: '5%'}}>
//                       <Text
//                       style={{
//                         color: '#fff',
//                         fontSize: 18,
//                         fontFamily: 'Roboto-Medium',
//                         marginBottom: 5,
//                       }}>
//                         Hello!
//                     </Text>
//                   <View style={{flexDirection: 'row'}}>
//                       <Text
//                         style={{
//                           color: '#fff',
//                           fontFamily: 'Roboto-Regular',
//                           marginRight: 5,
//                         }}>
//                         enter the subtitle
//                       </Text>
//                     </View>
//                   </View>                
//               </View>
//       <View style={{backgroundColor: 'white', flex: 1}}>
//         <Text
//           style={{
//             color: 'red',
//             fontSize: 27,
//             fontWeight: '700',
//             marginLeft: 20,
//           }}>
//           Gmail
//         </Text>
//         <View
//           style={{
//             width: '100%',
//             marginTop: 20,
//             height: 70,
//             borderTopWidth: 0.2,
//             borderBottomWidth: 0.2,
//             borderBottomColor: '#C7C7C7',
//             borderTopColor: '#C7C7C7',
//           }}>
//           <CommonCard
//             icon={require('../../assets/icons/star.png')}
//             count={''}
//             title={'Home'}
//             onClick={() => {
//               navigation.closeDrawer();
//             }}
//           />
//         </View>
//         <CommonCard
//           icon={require('../../assets/icons/star.png')}
//           count={'10+'}
//           bgColor={'#FFE4E4'}
//           title={'Order History(Counter)'}
//           onClick={() => {
//             navigation.closeDrawer();
//           }}
//         />
//         <CommonCard
//           icon={require('../../assets/icons/star.png')}
//           count={'10+'}
//           newColor={'green'}
//           isNew={true}
//           title={'Order History(Vehicle)'}
//           onClick={() => {
//             navigation.closeDrawer();
//           }}
//         />
//         <CommonCard
//           icon={require('../../assets/icons/star.png')}
//           count={'10+'}
//           newColor={'blue'}
//           isNew={true}
//           title={'Product Running OutOfStock'}
//           onClick={() => {
//             navigation.closeDrawer();
//           }}
//         />
//         <CommonCard
//           icon={require('../../assets/icons/star.png')}
//           count={'10+'}
//           newColor={'blue'}
//           isNew={true}
//           title={'Setting'}
//           onClick={() => {
//             navigation.closeDrawer();
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CustomDrawer;



import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>

            <View style={{ backgroundColor: '#23AA49', marginBottom: '2%', padding: '5%' }}>
                <Image
                    source={require('../../assets/user-profile.jpg')}
                    style={styles.imgStyle}
                ></Image>
                <Text style={styles.nameStyle}>Hello EveryOne!...</Text>
            </View>

            <DrawerItemList {...props} />
            <TouchableOpacity style={styles.btnStyle}>
                <View style={styles.shareContainer}>
                    <Ionicons name="exit-outline" size={22} color='#FF5757' />
                    <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 25,
                            color: '#FF5757',
                            fontWeight: '600'
                        }}>
                        Logout
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}
export default CustomDrawer
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgStyle: {

        height: 100,
        width: 90,
        borderRadius: 45
    },
    nameStyle: {
        color: 'white',
        fontSize: 18,
        marginBottom: '4%',
    },
    shareContainer: {
        flexDirection: 'row',
    },
    btnStyle: {
        marginTop: '70%',
        padding: '5%'

    }
})
