import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Pressable, ActivityIndicator } from "react-native";
import { FadeInDown } from "react-native-reanimated";
import Animated from "react-native-reanimated";

const Button = ({ carwash, navigation }) => {
  const [loading, setLoading] = useState(false);
  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Order', { carwash, navigation });
    }, 1000);
  };
  const { width } = useWindowDimensions();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <AnimatedPressable
      entering={FadeInDown.delay(1000)}
      onPress={handleOrder}
      style={[styles.container, { width: width * 0.9 }]}
    >
      {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Захиалах</Text>}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#033669',
    padding: 12,
    alignItems: 'center',
    height:48,
    borderRadius: 8,
    marginBottom: 20,
  },
  
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
});

export default Button;
