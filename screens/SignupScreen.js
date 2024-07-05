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
import { Formik } from 'formik';
import * as Yup from 'yup';
import SubmitButton from '../components/SubmitButton';
import { signup as signupApi } from '../api/user';

const logoImg = require('../assets/emu-logo.png');

const SignupScreen = ({ navigation }) => {

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    firstName: Yup.string()
      .required('Required'),
    lastName: Yup.string()
      .required('Required'),
    phoneNumber: Yup.string()
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password too short!')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Нууц үг тохирохгүй байна.')
      .required('Required'),
  });

  const handleSignup = async (values) => {
    try {
      await signupApi(values);
      Alert.alert('Success', 'Та амжилттай бүртгүүллээ.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to register user');
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholderTextColor="#A9A9A9"
            />
          </View>
          {errors.lastName && touched.lastName ? (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          ) : null}

          <View style={styles.labelContainer}>
            <Text>Нэр</Text>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name='user-o' style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Нэр"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholderTextColor="#A9A9A9"
            />
          </View>
          {errors.firstName && touched.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : null}

          <View style={styles.labelContainer}>
            <Text>И-мэйл</Text>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name='user-o' style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="И-мэйлээ оруулна уу."
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          {errors.email && touched.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <View style={styles.labelContainer}>
            <Text>Дугаар</Text>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name='user-o' style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Дугаараа оруулна уу."
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          {errors.phoneNumber && touched.phoneNumber ? (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          ) : null}

          <View style={styles.labelContainer}>
            <Text>Нууц үг</Text>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name='lock-closed-outline' style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Нууц үг"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              placeholderTextColor="#A9A9A9"
            />
          </View>
          {errors.password && touched.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <View style={styles.labelContainer}>
            <Text>Нууц үгээ дахин оруулна уу.</Text>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name='lock-closed-outline' style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Нууц үг"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
              placeholderTextColor="#A9A9A9"
            />
          </View>
          {errors.confirmPassword && touched.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
          
          {/* <SubmitButton text={"Бүртгүүлэх"} onPress={handleSubmit}/>  */}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Бүртгүүлэх</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
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




