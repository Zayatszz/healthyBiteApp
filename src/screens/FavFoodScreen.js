import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlexHeader from '../components/FlexHeader';
import FoodItem from '../components/CarWashItem1';
import { fetchCarwashServiceList as fetchCarwashServiceListApi } from '../api/user';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const FavFoodScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [carwashList, setCarwashList] = useState([]);
  const [filteredCarwashList, setFilteredCarwashList] = useState([]);
  
  const [mealTime, setMealTime] = useState('Өглөө');
  useFocusEffect(
    useCallback(() => {
      fetchCarwashList();
    }, [])
  );

  useEffect(() => {
    filterCarwashesByName();
  }, [searchText, mealTime, carwashList]);

  const fetchCarwashList = async () => {
    console.log("iishe orj bnu")
    setLoading(true);
    try {
      const data = await fetchCarwashServiceListApi();
      console.log("why hooson bh", data)
      setCarwashList(data);
      setFilteredCarwashList(data); // initialize with full data
      console.log(filteredCarwashList.length )
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filterCarwashesByName = () => {
    const filtered = carwashList.filter(carwash =>
      carwash.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCarwashList(filtered);
    console.log(filtered)
  };

  return (
    
    <View style={styles.container}>
      <FlexHeader headerText={'Хадгалсан хоол'} navigation={navigation} />
      <View style={styles.searchSection}>
        <View style={styles.searchInputz}>
          <AntDesign name='search1' style={styles.searchIcon} />
          <TextInput
            placeholder="Хоолны нэрээр хайх"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>


      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        filteredCarwashList.length === 0 ? (
          <Text style={styles.noResults}>Хоол олдсонгүй.</Text>
        ) : (
          <FlatList
            data={filteredCarwashList}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FoodItem carwash={item} index={index} navigation={navigation} />
            )}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            keyExtractor={item => item.id.toString()}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchSection: {
    marginHorizontal: 20,
    marginBottom: 8
  },
  searchInputz: {
    height: 60,
    borderColor: '#E0E0E0',
    backgroundColor: '#F4F6F9',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
    paddingRight: 15
  },
  mealTimeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F4F6F9',
    borderRadius: 16,
    padding: 2,
  },
  mealTimeBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  mealTimeBtnActive: {
    backgroundColor: '#50B86C',
  },
  mealTimeText: {
    color: '#6D7074',
    fontSize: 16,
    fontWeight: '500',
  },
  mealTimeTextActive: {
    color: '#fff',
  },
  noResults: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    marginTop: 20
  }
});

export default FavFoodScreen;
