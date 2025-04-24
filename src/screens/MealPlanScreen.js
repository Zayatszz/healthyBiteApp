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
import { fetchMealPlan } from '../api/user';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const MealPlanScreen = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [originalFoodList, setOriginalFoodList] = useState([]);
  const [mealTime, setMealTime] = useState('Өглөө');

  const { userInfo } = useContext(AuthContext);

  const mealTypeMap = {
    'Өглөө': 'breakfast',
    'Өдөр': 'lunch',
    'Орой': 'dinner',
  };

  // const reverseMealTypeMap = {
  //   'breakfast': 'Өглөө',
  //   'lunch': 'Өдөр',
  //   'dinner': 'Орой',
  // };

  const reverseMealTypeMap = {
    'BREAKFAST': 'Өглөө',
    'LUNCH': 'Өдөр',
    'DINNER': 'Орой',
  };
  
  // Тэгээд:
 
  

  useEffect(() => {
    // Home-оос ирсэн mealType-ийг mealTime-д хөрвүүлж оноох
    console.log("mealPlan mealType: "+route.params?.mealType)
    if (route.params?.mealType) {
      const initialMealTime = reverseMealTypeMap[route.params.mealType?.toUpperCase()];
      if (initialMealTime) {
        setMealTime(initialMealTime);
      }
    }
  }, [route.params?.mealType]);

  const fetchFoodList = async (mealType) => {
    setLoading(true);
    try {
      const data = await fetchMealPlan(userInfo.id, mealType);
      setFoodList(data);
      setOriginalFoodList(data);
    } catch (error) {
      console.error('Food fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFoodList(mealTypeMap[mealTime]);
    }, [mealTime])
  );

  useEffect(() => {
    if (searchText === '') {
      setFoodList(originalFoodList);
    } else {
      const filtered = originalFoodList.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFoodList(filtered);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <FlexHeader headerText={`${mealTime}-н хоол`} navigation={navigation} />

      <View style={styles.searchSection}>
        <View style={styles.searchInput}>
          <AntDesign name='search1' style={styles.searchIcon} />
          <TextInput
            placeholder="Хоолны нэрээр хайх"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <View style={styles.mealTimeTabs}>
        {['Өглөө', 'Өдөр', 'Орой'].map(label => (
          <TouchableOpacity
            key={label}
            onPress={() => setMealTime(label)}
            style={[
              styles.mealTimeBtn,
              mealTime === label && styles.mealTimeBtnActive
            ]}
          >
            <Text style={[
              styles.mealTimeText,
              mealTime === label && styles.mealTimeTextActive
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#50B86C" />
      ) : foodList.length === 0 ? (
        <Text style={styles.noResults}>Хоолны мэдээлэл олдсонгүй.</Text>
      ) : (
        // <FlatList
        //   data={foodList}
        //   renderItem={({ item, index }) => (
        //     <FoodItem food={item} index={index} navigation={navigation} />
        //   )}
        //   keyExtractor={item => item.id.toString()}
        //   contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        // />
        <FlatList
  data={foodList}
  renderItem={({ item, index }) => (
    <FoodItem
      food={item}
      index={index}
      navigation={navigation}
      mealType={mealTypeMap[mealTime]} // ЭНЭГЭЭР дамжуулна
    />
  )}
  keyExtractor={item => item.id.toString()}
  contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
/>

        
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
  searchInput: {
    height: 60,
    backgroundColor: '#F4F6F9',
    borderRadius: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    fontSize: 20,
    paddingRight: 15,
    color: '#666'
  },
  noResults: {
    marginTop: 40,
    textAlign: 'center',
    color: '#888',
    fontSize: 16
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
    paddingVertical: 10,
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
});

export default MealPlanScreen;
