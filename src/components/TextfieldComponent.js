import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const TextfieldComponent = () => {
  const [text, onChangeText] = React.useState('');

  return (
    <TextInput
      style={styles.input}
      placeholder="useless placeholder"
      onChangeText={onChangeText}
      value={text}
    />
  )
}

export default TextfieldComponent;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
});