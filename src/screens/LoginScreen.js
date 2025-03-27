import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext.js';
import { login as loginApi } from '../api/user.js';
import LinearGradient from 'react-native-linear-gradient';


const logoImg = require('../../assets/logo1.png');

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
    <LinearGradient
    colors={['#E5F5EA', '#FFFFFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.container}
  >
    
     <View style={styles.container}>
      <View style={[styles.section1]}>
        <Image style={styles.logoImg} source={logoImg} />
        <Text style={styles.sectionTitle}>Тавтай морилно уу</Text>
        <Text style={styles.paragraph}>Та бүртгэлтэй утасны дугаараа оруулан нэвтэрнэ үү.</Text>
      </View>
      <View >
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
      <View >
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
 
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop:50
  },
  section1: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight:29,
    textAlign: 'center',
    color: '#000',
    paddingBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    width:335,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.72)',
    // paddingHorizontal: 20,
  },
  logoImg: {
    // marginTop: 30,
    width: 105,
    height: 120,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom:34,
  },
 
  labelText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#080b11",
    marginBottom:6
    // textAlign: "left"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    height: 50,
  },
  forgetText: {
    // paddingTop: 10,
    paddingBottom: 24,
    textAlign: 'right',
    color: '#008bdc',
    fontSize: 13,
  },
  input: {
    paddingHorizontal:16,
    paddingVertical:12,
    fontSize:14,
    
    flex: 1,
    height: '100%',
  },
  registerContainer: {
    marginTop: 72,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  registerText: {
    fontSize:14,
    lineHeight:17,
    fontFamily:"Roboto-Regular",
    color: '#8B8E95',
  },
  registerLink: {
    color: '#008BDC',
    fontSize:14,
    lineHeight:17,
    fontFamily: "Roboto-Medium",

    fontWeight: '500',
    marginLeft: 5,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#50B86C',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:16, 
    paddingVertical:8
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 16,
    lineHeight:24,
    fontWeight: '500',
    fontFamily:"Inter-Medium"
  },
});

export default LoginScreen;
