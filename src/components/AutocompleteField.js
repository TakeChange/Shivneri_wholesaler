import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

const AutocompleteField = () => {

const suggestions = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Mango', 'Grapes'];
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (text) => {
    setInputValue(text);
    if (text.length > 0) {
      // Filter suggestions based on input text
      const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionPress = (text) => {
    setInputValue(text);
    setFilteredSuggestions([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
      <Text style={{ padding: 10 }}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
        onChangeText={handleInputChange}
        value={inputValue}
        placeholder="Type here..."
      />
      <FlatList
        data={filteredSuggestions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default AutocompleteField;