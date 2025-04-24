import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RegisteredMeals = ({ groupedMeals }) => {
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

  return (
    <View style={styles.registeredContainer}>
      {groupedMeals.map((item, index) => (
        <View style={styles.dayContainer} key={item.date + index}>
          <Text style={styles.dateHeader}>{item.date}</Text>
          {['Өглөө', 'Өдөр', 'Орой'].map(time => (
            item.meals[time] && item.meals[time].length > 0 && (
              <View key={time}>
                <Text style={styles.mealTimeText}>{time} хоол</Text>
                {item.meals[time].map(food => (
                  <View style={styles.foodCard} key={food.id}>
                    <Image
                      style={styles.foodImage}
                      source={imageMap[food.image] || defaultImage}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.foodName}>{food.name}</Text>
                      <Text style={styles.foodDetail}>{food.kcal} kcal  |  {food.time}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  registeredContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  mealTimeText: {
    fontSize: 13,
    color: '#6D7074',
    fontWeight: '600',
    marginVertical: 6,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
  foodName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  foodDetail: {
    fontSize: 12,
    color: '#6D7074',
  }
});

export default RegisteredMeals;
