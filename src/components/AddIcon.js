// AddIcon.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddIcon = ({ onPress, color }) => {
    return (
        <TouchableOpacity style={styles.floatIcon} onPress={onPress}>
            <Ionicons name='add-circle' size={38} style={{ ...styles.addIcon, color: color }} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatIcon: {
        position: 'absolute',
        bottom: 1,
        alignSelf: 'flex-end',
    },
    addIcon: {
        color: '#23AA49',
    },
});

export default AddIcon;
