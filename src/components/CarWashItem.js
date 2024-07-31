import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from "react-native-fast-image";
import Animated from "react-native-reanimated";
const CarWashItem = ({ carwash, navigation }) => {
  const images = {
    'carwashApp1.png': require("../../assets/carwashApp1.png"),
    'carwashApp2.jpg': require("../../assets/carwashApp2.jpg"),
    'carwashApp3.jpg': require("../../assets/carwashApp3.jpg"),
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailCarwash', { carwash, navigation })}>
      <View style={styles.item}>
        {/* <FastImage style={styles.carwashImg} source={images[carwash.imageUrl]} /> */}
        <Animated.Image  sharedTransitionTag={carwash.id.toString()} style={styles.carwashImg} source={images[carwash.imageUrl]} />
        <View style={styles.flex}>
          <Text style={styles.name}>{carwash.name}</Text>
          <View style={styles.flexz}>

          <FontAwesome name='star' style={{ color: '#FFCC33', fontSize: 16,paddingHorizontal:4 }}/>
          <Text style={styles.paragraph}>{carwash.stars} (12 үнэлгээ)</Text>
          </View>
        </View>
        <Text style={styles.paragraph}>{carwash.location} </Text>
        <Text style={styles.price}>₮20,000 - ₮60,000</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    paddingBottom: 15,
    width: 280,
    borderRadius: 10,
    borderColor: "#EBEBEB",
    borderWidth: 1,
    marginBottom: 80,
    // marginRight: 20,
    marginLeft: 20,
    paddingHorizontal:15,
    overflow: 'hidden', // Ensure children respect border radius
  },
  carwashImg: {
    resizeMode: 'cover',
    width: "100%",
    height: 180,
    borderRadius: 10,
    alignSelf: 'center', // Center the image
    marginTop:15,
    marginBottom:5,
    paddingHorizontal:30

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
    // paddingHorizontal: 10,
    // fontWeight: 'bold',
    fontSize:14
    
  },
  name:{
    // paddingTop: 5,
    
    fontWeight: 'bold',
    fontSize:17,
    color:"#000"
  },
  price:{
    paddingTop:10,
    // paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize:17,
    color:"#000"
  }
});

export default CarWashItem;
