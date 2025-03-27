import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { useDerivedValue, processColor, interpolateColor, useAnimatedStyle, interpolate, withSpring, withTiming, Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SWITCHER_WIDTH = (width - 32 -2) / 2;

const animateConfig = {
  duration: 200,
  // easing: Easing.bezier(.33,1,.47,1.01)
  easing: Easing.bezier(0.65, 0, 0.35, 1)
}

const Switch = ({ isSuccessful, setIsSuccessful }) => {
  const animation = useDerivedValue(() => (
    isSuccessful ? withTiming(0, animateConfig) : withTiming(1, animateConfig)
  ), [isSuccessful]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(animation.value, [0, 1], [0, SWITCHER_WIDTH]) }]
  }));
  const colorStyle1 = useAnimatedStyle(() => ({
    color: interpolateColor(animation.value, [0, 1], ['#fff', '#000'])
  }));
  const colorStyle2 = useAnimatedStyle(() => ({
    color: interpolateColor(animation.value, [0, 1], ['#000', '#fff'])
  }));
  const onChange = (isTrue) => {
    setIsSuccessful(isTrue)
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.switcher, style]} />
      <TouchableOpacity style={styles.half} onPress={() => onChange(true)}>
        <Animated.Text style={[styles.title, colorStyle1]}>Хоол</Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.half} onPress={() => onChange(false)}>
        <Animated.Text style={[styles.title, colorStyle2]}>Ус</Animated.Text>
      </TouchableOpacity>
    </View>
  )
}

export default Switch

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 54,
    borderRadius: 16,
    borderColor: '#E9E9E9',
    borderWidth: 1,
    // backgroundColor: '#F8F9FB',
    backgroundColor: '#F4F6F9',
    flexDirection: 'row',
    // padding: 4,
    alignSelf: 'center',
    marginTop: 8
  },
  switcher: {
    width: SWITCHER_WIDTH,
    height: 54,
    borderRadius: 16,
    
    backgroundColor: '#50B86C',
    position: 'absolute',
    color:'#fff'
    // top: 4,
    // left: 4,
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize:16,
    color:"#828282",
    fontWeight:'500'
  }
})