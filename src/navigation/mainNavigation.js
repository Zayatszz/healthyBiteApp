import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const MainNav = () => {
  const translateX = useRef(new Animated.Value(0)).current; // Initial position for 'home'
  const [currentIcon, setCurrentIcon] = useState('home'); // Track current icon in state

  const handleIconChange = (iconName) => {
    console.log("orj bnuda", iconName)
    let toValue;
    if (iconName === 'home') {
      toValue = -width / 2.2;
    } else if (iconName === 'user') {
      toValue = width / 2.2;
    }
    Animated.timing(translateX, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    handleIconChange(currentIcon);
  }, [currentIcon]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const iconName = route.name === 'Home' ? 'home' : 'user';

          useFocusEffect(
            useCallback(() => {
              setCurrentIcon(iconName)

              // console.log(currentIcon, "-current Icon in callback")
              // console.log(iconName, "-ymar icon deer darav")
              // if (currentIcon !== iconName) {
              //   setCurrentIcon(iconName); // Update state when focused and icon name changes
              // }
            }, [focused, iconName])
          );

          return (
            <View style={styles.iconContainer}>
              <Animated.View style={[ styles.yellowCircle, { transform: [{ translateX }] }]} />
              {/* <Animated.View style={[!focused && styles.yellowCircle, { transform: [{ translateX }] }]} /> */}
              <AntDesign name={iconName} style={[styles.icon, focused && styles.focusedIcon]} />
              {/* <AntDesign name={iconName} style={[styles.icon]} /> */}
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <LinearGradient
            // colors={['#66BBCC', '#4EA6CD', '#4EA6CD', '#1D7ECE', '#066BCF']}
            colors={['#066BCF', '#033669']}
            style={[StyleSheet.absoluteFill, styles.gradientStyle]}
          />
        ),
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFCC33',
    position: 'absolute',
    top: -15,
  },
  icon: {
    fontSize: 30,
    color: '#FFF',
  },
  focusedIcon: {
    color: '#FFD700', // Change color when focused
  },
  tabBarStyle: {
    backgroundColor: "#000",
    marginHorizontal: 20,
    height: 75,
    borderRadius: 50,
    position: 'absolute',
    bottom: 16,
  },
  gradientStyle: {
    borderRadius: 50,
  },
  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default MainNav;
