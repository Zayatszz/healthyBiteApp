// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput
// } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LoginScreen from './components/LoginScreen'
// import SignupScreen from './components/SignupScreen';

// // import { NavigationContainer } from '@react-navigation/native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MainScreen from './components/MainScreen';



// const logoImg = require('./assets/emu-logo.png');
// const Stack = createNativeStackNavigator();
// const App = () => {


//   return (

//       // <LoginScreen/>
//       // <SignupScreen/>
//       <NavigationContainer>
//       <Stack.Navigator initialRouteName="Signup">
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   //   <NavigationContainer>
//   //   <Stack.Navigator>
//   //     <Stack.Screen name="Signup" component={SignupScreen} />
//   //   </Stack.Navigator>
//   // </NavigationContainer>

//   );
// };


// export default App;


//2 context ashiglaad light and dark mode

// import React, { createContext, useContext, useState } from 'react';
// import { View, Text, Switch, StyleSheet, Button as RNButton } from 'react-native';

// const ThemeContext = createContext(null);

// export default function MyApp() {
//   const [theme, setTheme] = useState('light');

//   const styles = getStyles(theme);

//   return (
//     <ThemeContext.Provider value={theme}>
//       <View style={styles.container}>
//         <Form />
//         <View style={styles.switchContainer}>
//           <Text style={styles.label}>Use dark mode</Text>
//           <Switch
//             value={theme === 'dark'}
//             onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
//           />
//         </View>
//       </View>
//     </ThemeContext.Provider>
//   );
// }

// function Form() {
//   return (
//     <Panel title="Welcome">
//       <Button title="Sign up" />
//       <Button title="Log in" />
//     </Panel>
//   );
// }

// function Panel({ title, children }) {
//   const theme = useContext(ThemeContext);
//   const styles = getStyles(theme);

//   return (
//     <View style={styles.panel}>
//       <Text style={styles.title}>{title}</Text>
//       {children}
//     </View>
//   );
// }

// function Button({ title }) {
//   const theme = useContext(ThemeContext);
//   const styles = getStyles(theme);

//   return (
//     <View style={styles.buttonContainer}>
//       <RNButton title={title} color={theme === 'dark' ? '#fff' : '#000'} />
//     </View>
//   );
// }

// function getStyles(theme) {
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: theme === 'dark' ? '#333' : '#fff',
//     },
//     switchContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginTop: 20,
//     },
//     label: {
//       marginRight: 10,
//       color: theme === 'dark' ? '#fff' : '#000',
//     },
//     panel: {
//       padding: 20,
//       backgroundColor: theme === 'dark' ? '#444' : '#eee',
//       borderRadius: 10,
//       alignItems: 'center',
//     },
//     title: {
//       fontSize: 24,
//       marginBottom: 10,
//       color: theme === 'dark' ? '#fff' : '#000',
//     },
//     buttonContainer: {
//       marginVertical: 10,
//     },
//   });
// }


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { AuthProvider } from './context/AuthContext';
// import HomeScreen from './components/HomeScreen';
// import MainScreen from './components/MainScreen'; // Your main screen component

// const App = () => {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Signup">
//          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
//          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
//        </Stack.Navigator>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import LoginScreen from './components/LoginScreen'
// import SignupScreen from './components/SignupScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MainScreen from './components/MainScreen';
// import { AuthProvider } from './context/AuthContext';
// const logoImg = require('./assets/emu-logo.png');
// const Stack = createNativeStackNavigator();
// const App = () => {
//   return (
//     <AuthProvider>

//       <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     </AuthProvider>


//   );
// };
// export default App;



import React from 'react';
import AppNavigation from './navigation/appNavigation';

const App = () => {
  return (
    <AppNavigation />
  );
};

export default App;

