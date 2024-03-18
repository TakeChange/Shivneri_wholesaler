import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'


const SettingScreen = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: '7%', justifyContent: 'space-between' }}>
        <Text style={styles.text}>Show Catalog Page</Text>
        <ToggleSwitch
          isOn={isEnabled}
          onColor="#23AA29"
          offColor="#D6D6D6"
          size="small"
          onToggle={toggleSwitch}
        />
      </View>

      <View style={{ flexDirection: 'row', marginTop: '7%', justifyContent: 'space-between' }}>
        <Text style={styles.text}>Print (Confirmation Page)</Text>
        <ToggleSwitch
          isOn={isEnabled1}
          onColor="#23AA29"
          offColor="#D6D6D6"
          size="small"
          onToggle={toggleSwitch1}
        />
      </View>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    color: 'black',
    fontWeight: '900',
    fontSize: 18,
    marginLeft: '4%',

  },
})