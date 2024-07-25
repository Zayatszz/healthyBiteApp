import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext.js';
import { login as loginApi } from '../api/user.js';

const logoImg = require('../../assets/logoo.png');

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    setLoading(true); // Start loading indicator
    try {
      const data = await loginApi(emailOrPhoneNumber, password);
      await login(data.token, data.user);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', 'Амжилтгүй. Та мэдээллээ шалгаад дахин оруулна уу.');
      console.log('Error msg:', error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.section1]}>
        <Image style={styles.logoImg} source={logoImg} />
        <Text style={styles.sectionTitle}>Тавтай морилно уу</Text>
        <Text style={styles.paragraph}>Та бүртгэлтэй утасны дугаараа оруулан нэвтэрнэ үү.</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Утасны дугаар</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Утасны дугаар бичих"
          value={emailOrPhoneNumber}
          onChangeText={setEmailOrPhoneNumber}
          keyboardType="phone-pad"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Нууц үг</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Нууц үг бичих"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <Text style={styles.forgetText}>Нууц үгээ мартсан уу?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Нэвтрэх</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Бүртгэл үүсгээгүй юу?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.registerLink}>Бүртгүүлэх</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  section1: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    paddingBottom: 10,
    paddingTop: 10,
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    color: '#474747',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logoImg: {
    marginTop: 30,
    width: 100,
    height: 110,
    borderRadius: 10,
    textAlign: 'center',
  },
  labelContainer: {
    marginBottom: 10,
  },
  labelText: {
    fontSize: 13,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    height: 50,
  },
  forgetText: {
    paddingTop: 10,
    paddingBottom: 20,
    textAlign: 'right',
    color: '#008BDC',
    fontSize: 13,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  registerContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  registerText: {
    color: '#8B8E95',
  },
  registerLink: {
    color: '#008BDC',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#262626',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
