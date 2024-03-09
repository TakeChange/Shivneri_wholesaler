import React, { useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
];

const DropdownComponent = (item) => {
    const [value, setValue] = useState(null);

    
    return (
        
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={value}
            onChange={item => {
                setValue(item.value);
              }}
           />
           
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        
        width: '35%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignSelf:'center',
       
       
    },
    selectedTextStyle:{
        color:'black',
        fontSize:15,
         
    },
    placeholderStyle:{
        color:'#000',
        fontSize:14,
        
    }
   
});
