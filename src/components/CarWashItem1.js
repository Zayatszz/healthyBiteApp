import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const CarWashItem = ({ carwash, navigation, index }) => {
  const images = {
    'carwashApp1.png': require("../../assets/carwashApp1.png"),
    'carwashApp2.jpg': require("../../assets/carwashApp2.jpg"),
    'carwashApp3.jpg': require("../../assets/carwashApp3.jpg"),
  };

  return (
    <Animated.View entering={FadeInDown.delay(200*index)}>

    <TouchableOpacity onPress={() => navigation.navigate('DetailCarwash', { carwash, navigation })}>
      <View style={styles.item}>
        <Animated.Image 
            sharedTransitionTag={carwash.id.toString()}
            style={styles.carwashImg} 
            source={images[carwash.imageUrl]} 
        />
        <View style={styles.flex}>
          <Text style={styles.name}>{carwash.name}</Text>
          <View style={styles.flexz}>

          <FontAwesome name='star' style={{ color: '#FCBB45', fontSize: 20 }} />
          <Text style={styles.paragraph}>{carwash.stars}</Text>
          </View>
        </View>
        <Text style={styles.paragraph}>{carwash.location} </Text>
        <Text style={styles.price}> ₮20,000 - ₮60,000</Text>
      </View>
    </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    paddingBottom: 15,
    // width: 280,
    borderRadius: 10,
    // borderColor: "#EBEBEB",
    borderColor: "#000",
    borderWidth: 1,
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
  }
});

export default CarWashItem;
