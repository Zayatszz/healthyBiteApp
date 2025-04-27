import {React, useContext} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Animated from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FlexHeader from '../components/FlexHeader';
import { AuthContext } from '../context/AuthContext';
import { logFood } from '../api/user';
import {imageMap} from '../constants/imageMap'
const DetailFoodScreen = ({ route, navigation }) => {
  // const { food } = route.params;
  const { userInfo } = useContext(AuthContext); 
  const { food, mealType } = route.params;

  const defaultImage = require('../../assets/images/peanut-butter-toast.jpg');
  const imageSource = imageMap[food.image] || defaultImage;

  const handleRegisterFood = async () => {
    try {
      await logFood(userInfo.id, food.id, mealType); // mealType
      alert('Хоол амжилттай бүртгэгдлээ!');
      navigation.goBack(); 
    } catch (error) {
      console.error('Хоол бүртгэхэд алдаа гарлаа:', error);
      alert('Алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  return (
    <View style={styles.container}> 
         <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
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

        <View style={styles.stepsContainer}>
  <Text style={styles.stepsTitle}>Хоол хийх дараалал</Text>
  {food.cookingSteps?.map((step, index) => (
    <View key={index} style={styles.stepItem}>
      <Text style={styles.stepNumber}>{index + 1}.</Text>
      <Text style={styles.stepText}>{step}</Text>
    </View>
  ))}
</View>


        {/* Register Button */}
     
      </View>
    </ScrollView>
         <View style={styles.fixedBottom}>
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



    stepsContainer: {
      marginTop: 20,
      marginBottom: 40,
    },
    stepsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 12,
    },
    stepItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    stepNumber: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#50B86C',
      marginRight: 6,
    },
    stepText: {
      flex: 1,
      fontSize: 15,
      color: '#333',
      lineHeight: 20,
    },
    
    scrollContent: {
      paddingBottom: 100, // Бүртгэх товч дарагдахааргүй болгоно
    },
    
    fixedBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      // backgroundColor: '#fff',
      padding: 16,
      // borderTopWidth: 1,
      // borderColor: '#eee',
    },
    
  });
  

export default DetailFoodScreen;
