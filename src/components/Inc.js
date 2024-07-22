import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Cross from "react-native-vector-icons/Entypo"
import Add1 from "react-native-vector-icons/MaterialIcons"

const Inc = ({onPress1}) => {

  return (
    <View>
      <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 30 / 2, backgroundColor:'#23AA49',justifyContent:'center',alignItems:'center'}} onPress={onPress1}>
        <Add1
          name='add'
          size={25}
          color='white'
        />
      </TouchableOpacity>
    </View>
  )
}

export default Inc