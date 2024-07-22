import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const MainNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return (
            <View style={styles.iconContainer}>
            {focused && <View style={styles.yellowCircle} />}
            <AntDesign name={iconName} style={[styles.icon, focused && styles.focusedIcon]} />
          </View>
          );
        },
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#66BBCC', '#4EA6CD', '#4EA6CD', '#1D7ECE', '#066BCF']}
            style={[StyleSheet.absoluteFill, styles.gradientStyle]}
          />
        ),
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
    // left: '50%',
    // marginLeft: -5, 
  },
  icon: {
    fontSize: 30,
    color: '#FFF',
  },
 
 
  footerIcon: {
    color: '#FFF',
    fontSize: 30,
  },
  
  tabBarStyle: {
    backgroundColor:"#000",
    marginHorizontal:20,
    height: 75,
    borderRadius: 50,
    position: 'absolute',
    // left: 10,
    // right: 10,
    bottom: 16,
    // borderColor: 'transparent',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
    // elevation: 5,
  },
  gradientStyle:{
    borderRadius: 50,
  },
  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default MainNav;
