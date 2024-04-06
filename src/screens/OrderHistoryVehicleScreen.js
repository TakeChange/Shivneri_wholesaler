import { FlatList, ScrollView, StyleSheet, Text, View, } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

const OrderHistoryVechicleScreen = () => {

  const users = [
    {
      productName: 'Almond Barfi ₹2',
      companyName: 'Opening/General Company',
      gencyName: '',
      availableBoxQuantity: 0,
      availablePackQuantity: 0
    },
    {
      productName: 'Joy Bodylotion ₹10',
      companyName: 'Opening/General Company',
      agencyName: '',
      availableBoxQuantity: 0,
      availablePackQuantity: 0
    },
    {
      productName: 'Fruit Bites ₹20',
      companyName: 'Opening/General Company',
      agencyName: '',
      availableBoxQuantity: 0,
      availablePackQuantity: 0
    },
    {
      productName: 'Shiti Gems ₹5',
      companyName: 'Opening/General Company',
      agencyName: '',
      availableBoxQuantity: 0,
      availablePackQuantity: 0
    },
    {
      productName: 'Rohit Barfi ₹1',
      companyName: 'Opening/General Company',
      agencyName: '',
      availableBoxQuantity: 2,
      availablePackQuantity: 0
    },
  ];


  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserData data={item} />}
      />
    </View>
  );
};
const UserData = (props) => {
  const item = props.data
  return (
    <View style={styles.Container}>
      <Text style={styles.txt}>Product Name:{item.productName}</Text>
      <Text style={styles.txt}>Company Name: {item.companyName}</Text>
      <Text style={styles.txt}>Agency Name: {item.agencyName}</Text>

      <View style={styles.icons}>
        <AntDesign name="tags" size={18} color="#000" />
        <Text style={styles.txt}>Available Box Quantity: {item.availableBoxQuantity}</Text>
      </View>

      <View style={styles.icons}>
        <AntDesign name="tags" size={18} color="#000" />
        <Text style={styles.txt}>Available Pack Quantity: {item.availablePackQuantity}</Text>
      </View>
    </View>
  )
}

export default OrderHistoryVechicleScreen

const styles = StyleSheet.create({
  Container: {
    marginTop: '3%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: '4%',
    justifyContent: 'center',
    margin: '4%'
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000'
  },
  icons: {
    flexDirection: 'row',
    marginBottom: 5,
  },

})