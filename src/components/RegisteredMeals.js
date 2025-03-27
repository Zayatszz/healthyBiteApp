
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
const RegisteredMeals = ({ groupedMeals }) => {
    console.log(groupedMeals)
    return (
      <View style={styles.registeredContainer}>
       
        <FlatList
          data={groupedMeals}
          keyExtractor={(item, index) => item.date + index}
          showsVerticalScrollIndicator={true}
          style={{ maxHeight: 380 }} // ← заасан өндөр
          renderItem={({ item }) => (
            <View style={styles.dayContainer}>
              <Text style={styles.dateHeader}>{item.date}</Text>
              {['Өглөө', 'Өдөр', 'Орой'].map(time => (
                item.meals[time] && item.meals[time].length > 0 && (
                  <View key={time}>
                    <Text style={styles.mealTimeText}>{time} хоол</Text>
                    {item.meals[time].map(food => (
                      <View style={styles.foodCard} key={food.id}>
                        <Image source={food.image} style={styles.foodImage} />
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
          )}
        />
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
      
      sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#171532',
        marginBottom: 12,
      },
      
      dateHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
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
      },
    
    
      
  })
  export default RegisteredMeals;