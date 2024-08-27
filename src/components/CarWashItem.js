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
        <View>
          <View style={styles.flex}>
            <Text style={styles.name}>{carwash.name}</Text>
            <View style={styles.flexz}>

            <FontAwesome name='star' style={{ color: '#FFCC33', fontSize: 16,paddingHorizontal:4 }}/>
            <Text style={styles.paragraph}>{carwash.stars} (12 үнэлгээ)</Text>
            </View>
          </View>
          <Text style={styles.location}>{carwash.location} </Text>
          <Text style={styles.price}>20,000₮ - 60,000₮</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 12,
    width: 280,
    marginBottom: 80,
    // marginRight: 20,
    marginLeft: 20,
    overflow: 'hidden', // Ensure children respect border radius
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: {
      width: 0,
      height: 11
    },
    shadowRadius: 194,
    elevation: 194,
    shadowOpacity: 1,
    borderRadius: 12,
    borderStyle: "solid",
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderWidth: 1,
    flex: 1,
    gap: 12,
   
  },
  carwashImg: {
    resizeMode: 'cover',
    width: "100%",
    height: 165,
    borderRadius: 10,
    alignSelf: 'center', // Center the image

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
    fontSize:12,
    lineHeight:16,
    color:'#8b8e95'
    
  },
  location:{
    paddingTop:8,
    fontSize:12,
    lineHeight:14,
    color:'#8b8e95'
  },
  name:{
    // paddingTop: 5,
    
    fontWeight: '500',
    fontSize:16,
    lineHeight:19,
    color:'#141218',

  },
  price:{
    paddingTop:16,
    // paddingHorizontal: 10,
    fontWeight: '600',
    fontSize:16,
    lineHeight:19,
    color:"#141218"
  }
});

export default CarWashItem;
