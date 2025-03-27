import {React, useContext} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Animated from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FlexHeader from '../components/FlexHeader';
import { AuthContext } from '../context/AuthContext';
import { logFood } from '../api/user';
const DetailFoodScreen = ({ route, navigation }) => {
  const { food } = route.params;
  const { userInfo } = useContext(AuthContext); 
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

  const defaultImage = require('../../assets/images/peanut-butter-toast.jpg');
  const imageSource = imageMap[food.image] || defaultImage;

  const handleRegisterFood = async () => {
    try {
      await logFood(userInfo.id, food.id, 'BREAKFAST'); // mealType
      alert('Хоол амжилттай бүртгэгдлээ!');
      navigation.goBack(); 
    } catch (error) {
      console.error('Хоол бүртгэхэд алдаа гарлаа:', error);
      alert('Алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerSection}>
        <FlexHeader headerText={''} navigation={navigation} />
        </View>
       
      <Image source={imageSource} style={styles.foodImage} />

      {/* Зүрхэн икон */}
      <TouchableOpacity style={styles.heartIcon}>
        <FontAwesome name="heart-o" size={22} color="#000" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{food.name}</Text>

        {/* Nutrient box */}
        <View style={styles.nutrientRow}>
          <View style={styles.nutrientBox}>
            <Text style={styles.nutrientValue}>{food.calories}</Text>
            <Text style={styles.nutrientLabel}>ккал</Text>
          </View>
          <View style={styles.nutrientBox}>
            <Text style={styles.nutrientValue}>{food.protein} г</Text>
            <Text style={styles.nutrientLabel}>Уураг</Text>
          </View>
          <View style={styles.nutrientBox}>
            <Text style={styles.nutrientValue}>{food.fat} г</Text>
            <Text style={styles.nutrientLabel}>Өөх тос</Text>
          </View>
          <View style={styles.nutrientBox}>
            <Text style={styles.nutrientValue}>{food.carb} г</Text>
            <Text style={styles.nutrientLabel}>Нүүрс ус</Text>
          </View>
        </View>

        {/* Time */}
        <View style={styles.timeContainer}>
          <FontAwesome name="clock-o" size={16} color="#F7C100" />
          <Text style={styles.timeText}> Хийх хугацаа: <Text style={{ color: '#F7C100' }}>{food.cookingTime} минут</Text></Text>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegisterFood}>
      <Text style={styles.registerButtonText}>Хоол бүртгэх</Text>
    </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    foodImage: {
      width: '100%',
      height: 400,

    },
    heartIcon: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 20,
      elevation: 3,
    },
    headerSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 0, // статус барын зай
        paddingHorizontal: 0,
        zIndex: 10,
      }
      ,
    content: {
      paddingHorizontal: 24,
      paddingTop: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
      marginBottom: 20,
    },
    nutrientRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    nutrientBox: {
      backgroundColor: '#F5F6FA',
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 10,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 4,
    },
    nutrientValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    nutrientLabel: {
      fontSize: 13,
      color: '#6D7074',
      marginTop: 4,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      justifyContent: 'center',
    },
    timeText: {
      fontSize: 14,
      color: '#000',
      marginLeft: 6,
    },
    registerButton: {
      backgroundColor: '#F7C100',
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 30,
    },
    registerButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default DetailFoodScreen;
