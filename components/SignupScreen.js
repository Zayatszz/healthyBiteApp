// components/SignupScreen.js

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const logoImg = require('../assets/emu-logo.png');

const SignupScreen = ({ navigation }) => {
const test = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.37:3003/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phoneNumber,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('Error', data.error || 'Failed to register user');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logoImg} source={logoImg} />
      <View style={[styles.section1]}>
        <Text style={styles.sectionTitle}>Бүртгүүлэх</Text>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Аль хэдийн бүртгүүлчихсэн үү?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Нэвтрэх</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.labelContainer}>
        <Text>Овог</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name='user-o' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Овог"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text>Нэр</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name='user-o' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Нэр"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text>И-мэйл</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name='user-o' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="И-мэйлээ оруулна уу."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text>Дугаар</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name='user-o' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Дугаараа оруулна уу."
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text>Нууц үг</Text>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name='lock-closed-outline' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Нууц үг"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text>Нууц үгээ дахин оруулна уу.</Text>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name='lock-closed-outline' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Нууц үг"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Бүртгүүлэх</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  section1: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    paddingBottom: 20
  },
  logoImg: {
    width: 70,
    height: 60,
    borderRadius: 10,
  },
  userImg: {
    width: 100,
    height: 110,
    borderRadius: 10,
    textAlign: 'center',
  },
  labelContainer: {
    marginBottom: 10,
    marginLeft: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    height: 45,
  },
  icon: {
    fontSize: 20,
    color: '#A9A9A9',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#888',
  },
  loginLink: {
    color: '#1E90FF',
    marginLeft: 5,
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#1E90FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
