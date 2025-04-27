import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';
import { toggleFavoriteFood } from '../api/user';
import {imageMap} from '../constants/imageMap'

import { logFood } from '../api/user';
const FoodItem =  ({ food, navigation, index, mealType, isFavorite1 = false }) => {
  const defaultImage = require('../../assets/images/peanut-butter-toast.jpg');
  const { userInfo } = useContext(AuthContext);
  // const [isFavorite, setIsFavorite] = useState(food.isFavorite || false);

  const [isFavorite, setIsFavorite] = useState(food?.isFavorite || isFavorite1);
  const[isLogged, setIsLogged] = useState(false);

  const toggleFavorite = async () => {
    try {
      await toggleFavoriteFood( userInfo.id, food.id); // API-р нэмэх/устгах
      setIsFavorite(prev => !prev); // UI-г шинэчлэх
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };
    const handleRegisterFood = async () => {
      try {
        await logFood(userInfo.id, food.id, mealType); // mealType дамжуулна
        setIsLogged(true);
      } catch (error) {
        console.error('Хоол бүртгэхэд алдаа гарлаа:', error);
        alert('Алдаа гарлаа. Дахин оролдоно уу.');
      }
    };

  return (
    <Animated.View entering={FadeInDown.delay(200 * index)}>
     <TouchableOpacity onPress={() => navigation.navigate('DetailFood', { food, mealType })}>
        <View style={styles.foodItem}>
          <Image
            style={styles.foodImage}
            source={imageMap[food.image] ? imageMap[food.image] : defaultImage}
          />
          <View style={styles.foodContent}>
            <Text style={styles.foodName}>{food.name} {food.isFavorite}</Text>
            <Text style={styles.foodDetails}>{food.calories} kcal | {food.cookingTime} mins</Text>
          </View>

          <TouchableOpacity style={styles.actionContainer} onPress={handleRegisterFood}>
            {isLogged ? (
              <FontAwesome name="check-circle" size={28} color="#50B86C" />
            ) : (
              <FontAwesome name="circle-thin" size={28} color="#F4C92F" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite} style={styles.heartIcon}>
            {isFavorite ? (
              <FontAwesome name="heart" size={16} color="#EF5A5A" />
            ) : (
              <FontAwesome name="heart-o" size={16} color="#C7C9D9" />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: 16,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 16,
  },
  foodContent: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  foodDetails: {
    fontSize: 14,
    color: '#6D7074',
    marginTop: 4,
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default FoodItem;
