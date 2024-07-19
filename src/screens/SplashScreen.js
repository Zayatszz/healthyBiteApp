import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Dimensions, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const logoImg = require('../../assets/logoo.png');

const SplitAnimation = () => {
  const [isShowIcon, setShowIcon] = useState(false);
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const moveValue = useRef(new Animated.Value(0)).current; // New animated value for the triangle icon
  

  useEffect(() => {
    const iconTimeout = setTimeout(() => {
      setShowIcon(true);
    }, 350);

    Animated.sequence([
      Animated.timing(animatedValue1, {
        toValue: 1,
        duration: 300,
        delay: 300, // Adding delay of 800ms
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(moveValue, {
          toValue: 1,
          duration: 400, // Duration for the triangle icon movement
          useNativeDriver: true,
        }),
        
      ])
    ]).start();

    return () => clearTimeout(iconTimeout); // Cleanup the timeout
  }, []);

  const getAnimatedStyle = (translateX, translateY, moveX, moveY ) => ({
    transform: [
      {
        translateX: animatedValue1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, translateX],
        }),
      },
      {
        translateY: animatedValue1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, translateY],
        }),
      },
      {
        translateX: moveValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, moveX], 
        }),
      },
      {
        translateY: moveValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, moveY], 
        }),
      }, 
    ],
  });

  const animatedStyle1 = getAnimatedStyle(-width / 5, -height / 8, 40, 0);
  const animatedStyle2 = getAnimatedStyle(width / 5, -height / 8, 0, 40);
  const animatedStyle3 = getAnimatedStyle(-width / 5, height / 8, 0, -40);
  const animatedStyle4 = getAnimatedStyle(width / 5, height / 8, -40, 0);

  return (
    <View style={styles.container}>
      <Image style={styles.logoImg} source={logoImg} />
      {isShowIcon && (
        <>
          <Animated.View style={[styles.box, animatedStyle1]}>
            <Ionicons name='triangle-sharp' size={30} style={styles.icon1} />
          </Animated.View>
          <Animated.View style={[styles.box, animatedStyle2]}>
            <FontAwesome name='remove' size={25} style={styles.icon2} />
          </Animated.View>
          <Animated.View style={[styles.box, animatedStyle3]}>
            <FontAwesome name='circle' size={20} style={styles.icon3} />
          </Animated.View>
          <Animated.View style={[styles.box, animatedStyle4]}>
            <MaterialCommunityIcons name='chart-line-variant' size={30} style={styles.icon4} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  logoImg: {
    width: 150,
    height: 150,
  },
  icon1: {
    color: '#244579',
  },
  icon2: {
    color: '#FF8863',
  },
  icon3: {
    color: '#FF9B63',
  },
  icon4: {
    color: '#2359AD',
  },
});

export default SplitAnimation;



