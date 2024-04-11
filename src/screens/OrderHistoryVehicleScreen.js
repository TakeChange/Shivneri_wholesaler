import { FlatList, StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'

const OrderVehicleScreen = () => {

  const users = [
    {
      Customer: "Mangesh Lilake",
      Order: 34866,
      Total: 2532,

    },
    {
      Customer: "Cash Bill",
      Order: 34865,
      Total: 94
    },
    {
      Customer: "Cash Bill",
      Order: 34866,
      Total: 156
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 110
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 78
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 94
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 78
    },
    {
      Customer: "Cash Bill",
      Order: 34863,
      Total: 144
    }
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
      <View style={styles.flatstyle}>
        <Text style={styles.txt}>Customer Name: {item.Customer}</Text>
        <Text style={styles.txt}>Order ID: {item.Order}</Text>
        <Text style={styles.txt}>Total: ₹ {item.Total}</Text>
        <Text style={styles.calender}>
          <FontAwesome name='calendar' size={16} color='#000000' /> 2024-03-06</Text>

        <View>
          <Text style={styles.txt}>View Bill</Text>
          <Entypo name='eye' size={22} color='#000000' />
        </View>
      </View>
    </View>

  )
}

export default OrderVehicleScreen 

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',

  },
  calender: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  flatstyle: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    width: '100%',
    marginVertical: 5,

  }
})