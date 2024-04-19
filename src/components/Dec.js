import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Cross from "react-native-vector-icons/Entypo"
import Add1 from "react-native-vector-icons/MaterialIcons"

const Dec = ({onPress2}) => {
  return (
    <View>
      <TouchableOpacity style={{ width: 26, height: 26, borderRadius: 26 / 2, borderWidth: 1, borderColor: '#DFE3FF',alignItems:'center' }} onPress={onPress2}>
        <Cross
          name='minus'
          size={25}
          color='black'
        />
      </TouchableOpacity>
    </View>
  )
}

export default Dec