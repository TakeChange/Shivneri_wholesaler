import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Cross from "react-native-vector-icons/Entypo"
import Add1 from "react-native-vector-icons/MaterialIcons"

const Inc = ({onPress1}) => {

  return (
    <View>
      <TouchableOpacity style={{ width: 26, height: 26, borderRadius: 30 / 2, borderWidth: 1, borderColor: '#DFE3FF' }} onPress={onPress1}>
        <Add1
          name='add'
          size={25}
          color='black'
        />
      </TouchableOpacity>
    </View>
  )
}

export default Inc