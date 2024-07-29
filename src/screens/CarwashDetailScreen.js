import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Header from '../components/Header'; 
import Button from '../components/Button';

const images = {
  'carwashApp1.png': require("../../assets/carwashApp1.png"),
  'carwashApp2.jpg': require("../../assets/carwashApp2.jpg"),
  'carwashApp3.jpg': require("../../assets/carwashApp3.jpg"),
};

const CarwashDetailScreen = ({ route, navigation }) => {
  const { carwash } = route.params;
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Order', { carwash, navigation });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
     <View>

      <View style={styles.imgContainer}>

        <Animated.Image 
          sharedTransitionTag={carwash.name}
          style={styles.carwashImg}
          source={images[carwash.imageUrl]} 
        />
        <Animated.View
        entering={FadeIn.delay(600)}
         style={styles.textContainer}>
          <Text style={styles.textName} >{carwash.name}</Text>
          <Text style={styles.textLocation} >{carwash.location}</Text>
          
        </Animated.View>
       
      </View>
      <Animated.View entering={FadeInDown.delay(800)}>
          <Text style={styles.textDescription}>Дэлгэрэнгүй</Text>
          <Text style={styles.text}>{carwash.description}</Text>
        </Animated.View>
     </View>
        <View style={styles.btnContainer}>

        <Button carwash={carwash} navigation={ navigation} />
        </View>
      {/* Uncomment this part for other details and button */}
      {/* 
      <Text style={styles.title}>{carwash.name}</Text>
      <Text style={styles.paragraph}>{carwash.description}</Text>
      <Text style={styles.paragraph}>Location: {carwash.location}</Text>
      <Text style={styles.paragraph}>Phone: {carwash.phoneNumber}</Text>
      <Text style={styles.paragraph}>Capacity: {carwash.capacity}</Text>
      <Text style={styles.paragraph}>Stars: {carwash.stars}</Text>
      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Захиалах</Text>}
      </TouchableOpacity>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFF',
    height:'100%',
    // alignItems: 'center',
    // justifyContent:'center'
    justifyContent:'space-between'
  },
  btnContainer:{
    alignItems: 'center',
    justifyContent:'center',
    justifyContent:'space-between'
  },
  carwashImg: {
    height: 400,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
   
  },
  imgContainer:{
    alignItems: 'center',
  },
  textContainer:{
    position:'absolute',
    bottom:10,
    backgroundColor:'rgba(0,0,0,0.6)',
    left:10,
    right:10,
    padding:16,
    borderRadius:20
  },
  textName:{
    color:'#fff',
    fontSize:32,
    fontWeight:'bold'
  },
  textLocation:{
    color:'#fff',
    fontSize:16,
  },
  textDescription:{
    color:'#323232',
    fontSize:28,
    fontWeight:'bold',
    margin:10
  },
  text:{
    color:'#323232',
    fontSize:16,
    marginHorizontal:10,
    textAlign:'justify'
  },
 
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#1E90FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Add other styles if needed
});

export default CarwashDetailScreen;
