
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext.js';
import { login as loginApi } from '../../api/user.js';

const logoImg = require('../../assets/emu-logo.png');

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginApi(email, password);
      await login(data.token);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', 'Амжилтгүй. Та мэдээллээ шалгаад дахин оруулна уу.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logoImg} source={logoImg} />
      <View style={[styles.section1]}>
        <Text style={styles.sectionTitle}>Нэвтрэх</Text>
        <Image style={styles.userImg} source={require('../../assets/user.png')} />
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
      <View style={styles.inputContainer}>
        <Ionicons name='lock-closed-outline' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Нууц үгээ оруулна уу."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Бүртгэлгүй бол бүртгүүлнэ үү.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.registerLink}>Бүртгүүлэх</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Нэвтрэх</Text>
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
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    paddingBottom: 20,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    height: 60,
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
  registerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  registerText: {
    color: '#888',
  },
  registerLink: {
    color: '#1E90FF',
    marginLeft: 5,
  },
  button: {
    width: '100%',
    height: 50,
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

export default LoginScreen;
