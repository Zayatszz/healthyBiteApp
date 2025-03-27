import React, { useState, useEffect, useContext } from 'react';
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
import FoodItem from '../components/FoodItem';
import { fetchCarwashServiceList as fetchCarwashServiceListApi } from '../api/user';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getFavoriteFoods } from '../api/user';

const FavFoodScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [carwashList, setCarwashList] = useState([]);
  const [filteredCarwashList, setFilteredCarwashList] = useState([]);

  const [favoriteFoods, setFavoriteFoods] = useState([]);

  const { userInfo } = useContext(AuthContext);
  
  const [mealTime, setMealTime] = useState('Өглөө');
 

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteFoods(userInfo.id);
        setFavoriteFoods(data);
      } catch (error) {
        console.error('Failed to fetch favorite foods:', error);
      }
    };
  
    fetchFavorites();
  }, []);

  useEffect(() => {
    filterFavoriteFoodsByName();
  }, [searchText, favoriteFoods]);
  



  const handleSearch = (text) => {
    setSearchText(text);
  };

 
  // SEARCH-ийг favoriteFoods дээр тулгуурлан шүүнэ
const filterFavoriteFoodsByName = () => {
    const filtered = favoriteFoods.filter(food =>
      food.food.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCarwashList(filtered);
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
        favoriteFoods.length === 0 ? (
          <Text style={styles.noResults}>Хоол олдсонгүй.</Text>
        ) : (
            <FlatList
            data={filteredCarwashList}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FoodItem food={item.food} index={index} navigation={navigation} isFavorite1={true} />
            )}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            keyExtractor={item => item.id}
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
