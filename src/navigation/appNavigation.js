import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import mainNavigation from './mainNavigation';

import MealPlanScreen from '../screens/MealPlanScreen';
import FavFoodScreen from '../screens/FavFoodScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';

import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NotificationScreen from '../screens/NotificationScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import DetailFoodScreen from '../screens/DetailFoodScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { token, loading, userInfo } = useContext(AuthContext);
  // console.log("check health: ",userInfo.healthInfo)
  const [isShowSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
  {isShowSplash ? (
    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
  ) : token ? (
    userInfo?.healthInfo ? (
      <>
        <Stack.Screen name="Main" component={mainNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="DetailFood" component={DetailFoodScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MealPlan" component={MealPlanScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FavFood" component={FavFoodScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangePass" component={ChangePasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }}/>
      </>
    ) : (
      <>
        <Stack.Screen name="Question" component={QuestionnaireScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={mainNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="DetailFood" component={DetailFoodScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MealPlan" component={MealPlanScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FavFood" component={FavFoodScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangePass" component={ChangePasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }}/>
      </>
    )
  ) : (
    <>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    </>
  )}
</Stack.Navigator>

  );
};

const AppNavigation = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigation;
