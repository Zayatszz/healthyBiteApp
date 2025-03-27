import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';
import { toggleFavoriteFood } from '../api/user';

import { logFood } from '../api/user';
const FoodItem = ({ food, navigation, index, isFavorite1 = false }) => {
  const defaultImage = require('../../assets/images/peanut-butter-toast.jpg');

  const imageMap = {
    "/images/avocado-toast.jpg": require('../../assets/images/avocado-toast.jpg'),
    "/images/scrambled-eggs.jpg": require('../../assets/images/scrambled-eggs.jpg'),
    "/images/chia-seed-pudding.jpg": require('../../assets/images/chia-seed-pudding.jpg'),
    "/images/cottage-cheese-with-berries.jpg": require('../../assets/images/cottage-cheese-with-berries.jpg'),
    "/images/greek-yogurt-with-honey.jpg": require('../../assets/images/greek-yogurt-with-honey.jpg'),
    "/images/low-potassium-porridge.jpg": require('../../assets/images/low-potassium-porridge.jpg'),
    "/images/low-sodium-miso-soup.jpg": require('../../assets/images/low-sodium-miso-soup.jpg'),
    "/images/tofu-and-veggie-bowl.jpg": require('../../assets/images/tofu-and-veggie-bowl.jpg'),
    "/images/boiled-eggs.jpg": require('../../assets/images/boiled-eggs.jpg'),
    "/images/peanut-butter-toast.jpg": require('../../assets/images/peanut-butter-toast.jpg'),
  };

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
        await logFood(userInfo.id, food.id, 'BREAKFAST'); // mealType
        setIsLogged(true)
        // alert('Хоол амжилттай бүртгэгдлээ!');
        // navigation.goBack(); 
      } catch (error) {
        console.error('Хоол бүртгэхэд алдаа гарлаа:', error);
        alert('Алдаа гарлаа. Дахин оролдоно уу.');
      }
    };


  return (
    <Animated.View entering={FadeInDown.delay(200 * index)}>
      <TouchableOpacity onPress={() => navigation.navigate('DetailFood', { food })}>
        <View style={styles.foodItem}>
          <Animated.Image
            sharedTransitionTag={food.id.toString()}
            style={styles.foodImage}
            source={imageMap[food.image] ? imageMap[food.image] : defaultImage}
          />
          <View style={styles.foodContent}>
            <Text style={styles.foodName}>{food.name}</Text>
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
