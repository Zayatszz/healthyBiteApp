import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FoodItem = ({ carwash, navigation, index }) => {
  const images = {
    'carwashApp1.png': require("../../assets/carwashApp1.png"),
    'carwashApp2.jpg': require("../../assets/carwashApp2.jpg"),
    'carwashApp3.jpg': require("../../assets/carwashApp3.jpg"),
  };

  console.log("1", carwash)
  const [isFavorite, setIsFavorite] = useState(carwash.isFavorite || false); 

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Animated.View entering={FadeInDown.delay(200*index)}>

    <TouchableOpacity onPress={() => navigation.navigate('DetailCarwash', { carwash, navigation })}>

    <View style={styles.foodItem}>
      <Animated.Image 
            sharedTransitionTag={carwash.id.toString()}
            style={styles.foodImage} 
            source={images[carwash.imageUrl]} 
        />
      <View style={styles.foodContent}>
        <Text style={styles.foodName}>{carwash.name}</Text>
        <Text style={styles.foodDetails}>{carwash.name} kcal  |  {carwash.name}</Text>
      </View>
   
      <View style={styles.actionContainer}>
      {/* Favorite icon - top right */}
     
      {/* Selection circle */}
      <FontAwesome name="circle-thin" size={28} color="#F4C92F" />
    </View>
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
  item: {
    backgroundColor: "#FFF",
    paddingBottom: 15,
    // width: 280,
    borderRadius: 10,
    // borderColor: "#EBEBEB",
    borderColor: "#EBEBEB",
    borderWidth: 1.5,
    marginBottom: 20,
    // marginRight: 20,
    // marginLeft: 20,
    
    overflow: 'hidden', // Ensure children respect border radius
  },
  carwashImg: {
    
    // width: 300,
    height: 180,
    borderRadius: 10,
    alignSelf: 'center', // Center the image
    // margin:15,
    alignItems:'center',
    justifyContent:'center'

  },
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexz: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  paragraph: {
    paddingHorizontal: 10,
    // fontWeight: 'bold',
    fontSize:16
    
  },
  name:{
    // paddingTop: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize:17,
    color:"#000"
  },
  price:{
    paddingTop:15,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize:17,
    color:"#000"
  },


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
  actions: {
    alignItems: 'center',
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
