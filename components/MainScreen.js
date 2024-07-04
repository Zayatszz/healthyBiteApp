import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
};

const Profile = () => {
  return (
    <View style={styles.container}>
      <ProfileScreen />
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return (
            <View style={[styles.footerCont, { backgroundColor: focused ? '#EDB20E' : '#FFF' }]}>
              <FontAwesome name={iconName} style={styles.footerIcon} />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: '#066BCF',
          borderColor: '#000',
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerCont: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  footerIcon: {
    color: 'black',
    fontSize: 30,
  },
});

export default MainScreen;
