import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BillScreen = () => {
  const [billItems, setBillItems] = useState([
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
    { id: 4, name: 'Item 1', price: 10 },
    { id: 5, name: 'Item 2', price: 20 },
    { id: 6, name: 'Item 3', price: 30 },
  ]);

  const handleAddItem = (id) => {
    console.log('Add item with id:', id);
  };

  const handleDeleteItem = (id) => {
    console.log('Delete item with id:', id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Item Name</Text>
          <Text style={styles.headerText}>Qty.</Text>
          <Text style={styles.headerText}>Price</Text>
          <Text style={styles.headerText}>Actions</Text>
        </View>
        {billItems.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.actionButton1}>
              <Text style={styles.incStyle}>+</Text>
              </TouchableOpacity>
             <Text style={styles.itemName}>{item.price}</Text>
             <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.actionButton1}>
             <Text style={styles.incStyle}>-</Text>
              </TouchableOpacity>

            <Text style={styles.itemPrice}>${item.price}</Text>
            <View style={styles.actionsContainer}>
              {/* <TouchableOpacity onPress={() => handleAddItem(item.id)} style={styles.actionButton}>
                <Text>Add</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.actionButton}>
              <Icon name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  actionButton1: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  incStyle:{
    color:'white',
    fontWeight:'bold'
  }
});

export default BillScreen;
