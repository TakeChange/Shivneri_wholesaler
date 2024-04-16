
// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, TextInput, FlatList, TouchableOpacity, View, Text } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';

// const CreditBalanceScreen = () => {
//     const [search, setSearch] = useState('');
//     const [data, setData] = useState([]);
//     const [sortedData, setSortedData] = useState([]);
//     const [itemClicked, setItemClicked] = useState(false);
//     const flatListRef = useRef(null);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('https://demo.raviscyber.in/public/customerlist.php');
//             const { data } = response.data;
//             console.log('response', response.data);
//             const sorted = data.sort((a, b) => {
//                 const nameA = a.user_name.toLowerCase();
//                 const nameB = b.user_name.toLowerCase();
//                 if (nameA < nameB) return -1;
//                 if (nameA > nameB) return 1;
//                 return 0;
//             });
//             setData(sorted);
//             setSortedData(sorted);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const handleSearch = text => {
//         setSearch(text);
//         if (text.trim() === '') {
//             setData(sortedData);
//             setItemClicked(false); // Reset itemClicked state when search bar is cleared
//         } else {
//             const filtered = sortedData.filter(item =>
//                 item.user_name.toLowerCase().includes(text.toLowerCase())
//             );
//             setData(filtered);
//             setItemClicked(false); // Reset itemClicked state when new search is performed
//         }
//     };

//     const renderItem = ({ item }) => {
//         // Add guard clause to check if item exists
//         if (!item || !item.user_name) return null;

//         return (
//             <TouchableOpacity onPress={() => handleItemClick(item.user_name)}>
//                 <View style={styles.item}>
//                     <Text>{item.user_name}</Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     };

//     const handleItemClick = itemName => {
//         console.log("Item clicked:", itemName);
//         // Set the clicked item's name in the search bar
//         setSearch(itemName);
//         // Clear the list of items
//         setData([]);
//         // Set itemClicked to true
//         setItemClicked(true);
//     };

//     const handleClearSearch = () => {
//         // Clear the search bar and reset the itemClicked state
//         setSearch('');
//         setItemClicked(false);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.searchbar}>
//                 <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
//                 <TextInput
//                     placeholder="Search..."
//                     onChangeText={handleSearch}
//                     style={styles.textinput}
//                     value={search}
//                 />
//                 {search !== '' && itemClicked && (
//                     <TouchableOpacity onPress={handleClearSearch} style={styles.clearIcon}>
//                         <Ionicons name="close" size={24} color="gray" />
//                     </TouchableOpacity>
//                 )}
//             </View>
//             {data.length > 0 && (
//                 <FlatList
//                     ref={flatListRef}
//                     data={data}
//                     renderItem={renderItem}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             )}
//         </View>
//     );
// };

// export default CreditBalanceScreen;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'red',
//         padding: 10,
//         flex: 1,
//     },
//     searchbar: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0',
//         borderRadius: 10,
//         marginVertical: '2%',
//         paddingHorizontal: 10,
//     },
//     searchIcon: {
//         marginRight: 10,
//     },
//     textinput: {
//         flex: 1,
//     },
//     item: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#cccccc',
//         marginBottom: 10,
//         paddingBottom: 10,
//     },
//     clearIcon: {
//         marginLeft: 10,
//     },
// });


import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, FlatList, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const CreditBalanceScreen = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [itemClicked, setItemClicked] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const flatListRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://demo.raviscyber.in/public/customerlist.php');
            const { data } = response.data;
            console.log('response', response.data);
            const sorted = data.sort((a, b) => {
                const nameA = a.user_name.toLowerCase();
                const nameB = b.user_name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            setData(sorted);
            setSortedData(sorted);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    const handleSearch = text => {
        setSearch(text);
        if (text.trim() === '') {
            setData(sortedData);
            setItemClicked(false); // Reset itemClicked state when search bar is cleared
        } else {
            const filtered = sortedData.filter(item =>
                item.user_name.toLowerCase().includes(text.toLowerCase())
            );
            setData(filtered);
            setItemClicked(false); // Reset itemClicked state when new search is performed
        }
    };

    const renderItem = ({ item }) => {
        // Add guard clause to check if item exists
        if (!item || !item.user_name) return null;

        return (
            <TouchableOpacity onPress={() => handleItemClick(item.user_name)}>
                <View style={styles.item}>
                    <Text>{item.user_name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleItemClick = itemName => {
        console.log("Item clicked:", itemName);
        // Set the clicked item's name in the search bar
        setSearch(itemName);
        // Clear the list of items
        setData([]);
        // Set itemClicked to true
        setItemClicked(true);
    };

    const handleClearSearch = () => {
        // Clear the search bar and reset the itemClicked state
        setSearch('');
        setItemClicked(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchbar}>
                <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search..."
                    onChangeText={handleSearch}
                    style={styles.textinput}
                    value={search}
                />
                {search !== '' && itemClicked && (
                    <TouchableOpacity onPress={handleClearSearch} style={styles.clearIcon}>
                        <Ionicons name="close" size={24} color="gray" />
                    </TouchableOpacity>
                )}
            </View>
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="gray" />
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
};

export default CreditBalanceScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        padding: 10,
        flex: 1,
    },
    searchbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginVertical: '2%',
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    textinput: {
        flex: 1,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginBottom: 10,
        paddingBottom: 10,
    },
    clearIcon: {
        marginLeft: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
