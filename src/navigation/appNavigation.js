import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import mainNavigation from './mainNavigation';
import CarwashDetailScreen from '../screens/CarwashDetailScreen';
import AllCarwashScreen from '../screens/AllCarwashScreen';
import OrderScreen from '../screens/OrderScreen';
import SplashScreen from '../screens/SplashScreen';
import PaymentScreen from '../screens/PaymentScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { token, loading } = useContext(AuthContext);
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
    <Stack.Navigator
      // screenOptions={{
      //   headerStyle:{
      //     backgroundColor:"yellow"
      //   }
      // }}
    >  
      {isShowSplash ? (
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
       
      ) : (
       
         token ? (
          <>
          <Stack.Screen name="Main" component={mainNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="DetailCarwash" component={CarwashDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AllCarwash" component={AllCarwashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ChangePass" component={ChangePasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }}/>
        </>
          
        ) : (
          <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        </>
        )
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
