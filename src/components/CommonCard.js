import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const CommonCard = ({
  isNew,
  count,
  newColor,
  title,
  icon,
  bgColor,
  onClick,
}) => {
  return (
    <View style={{width: '100%', height: 50, justifyContent: 'center'}}>
      <TouchableOpacity
        style={{
          width: '96%',
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: bgColor ? bgColor : '#fff',
        }}
        onPress={() => {
          onClick();
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={icon}
            style={{
              width: 24,
              height: 24,
              marginLeft: 10,
              tintColor: bgColor ? 'red' : '#6D6D6D',
            }}
          />
          <Text
            style={{
              marginLeft: 20,
              fontWeight: '600',
              color: bgColor ? 'red' : '#6D6D6D',
              fontSize: 14,
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CommonCard;
