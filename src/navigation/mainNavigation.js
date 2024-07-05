import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

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
            <View style={[styles.footerCont, focused && styles.focusedFooterCont]}>
              <FontAwesome name={iconName} style={styles.footerIcon} />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  footerCont: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  focusedFooterCont: {
    backgroundColor: '#EDB20E',
  },
  footerIcon: {
    color: 'black',
    fontSize: 30,
  },
  tabBarStyle: {
    height: 80,
    backgroundColor: '#066BCF',
    borderColor: '#000',
    borderTopWidth: 1,
  },
});

export default MainNav;
