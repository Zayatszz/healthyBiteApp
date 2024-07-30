import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import CarWashItem from '../components/CarWashItem1';

const AllCarwashScreen = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const { filteredList } = route.params;
  const [filteredCarwashList, setFilteredCarwashList] = useState(filteredList);

  useEffect(() => {
    filterCarwashesByName();
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filterCarwashesByName = () => {
    const filtered = filteredList.filter(carwash =>
      carwash.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCarwashList(filtered);
    console.log(filtered)
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <TextInput
          style={styles.searchInput}
          placeholder="Угаалгын газрын нэрийг оруулна уу."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.CarWashItem}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          filteredCarwashList.length === 0 ? (
            <Text style={styles.noResults}>Угаалгын газар олдсонгүй.</Text>
          ) : (
            // <Text style={styles.noResults}>{filteredCarwashList.length } ийм байна</Text>
            <FlatList
              data={filteredCarwashList}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <CarWashItem carwash={item} index={index} navigation={navigation} />}
              keyExtractor={item => item.id.toString()}
            />
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    padding: 10,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  CarWashItem: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  noResults: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
  },
});

export default AllCarwashScreen;
