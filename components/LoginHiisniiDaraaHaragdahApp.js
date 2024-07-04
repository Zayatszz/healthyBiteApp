import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen'

enableScreens();


const Home = () => {
  return (
    <View style={styles.container}>
      <HomeScreen/>
    </View>
  );
};

const Profile = () => {
  return (
    <View style={styles.container}>
      <ProfileScreen/>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator 
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }
            
            return  <View style={[styles.footerCont, { backgroundColor: focused ? '#EDB20E' : '#FFF' }]}>
          <Text>
  
          <FontAwesome name={iconName} style={[styles.footerIcon,  ]}/>
          </Text>
           
          </View>
            
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80, // Increase the height of the footer
            backgroundColor:'#066BCF',
            borderColor:'#000',
            borderTopWidth:1
            // borderWidth:2,
            

            // paddingBottom: 20, 
          },
        })}
        // tabBarOptions={{
        //   activeTintColor: 'tomato',
        //   inactiveTintColor: 'gray',
        // }}
      >
        <Tab.Screen  name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  section1: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  paragraph: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  parText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  flexHeader: {
    backgroundColor: '#FFF',
    padding: 10,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex: {
    padding: 10,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allBtn: {
    width: 120,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  logoImg: {
    width: 70,
    height: 60,
    borderRadius: 10,
  },
  CarWashItem: {
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#58B3F0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#18A0FB',
    borderWidth: 1,
  },
  addText: {},
  footerCont:{
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  footerIcon:{
    color:'black', fontSize:30
  }
});

export default App;
