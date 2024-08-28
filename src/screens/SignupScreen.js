import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signup as signupApi } from '../api/user';

const logoImg = require('../../assets/logoo.png');

const SignupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    userName: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password too short!').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Нууц үг тохирохгүй байна.')
      .required('Required'),
  });

  const handleSignup = async (values) => {
    setLoading(true);
    try {
      await signupApi(values);
      Alert.alert('Success', 'Та амжилттай бүртгүүллээ.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        userName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <View style={styles.section1}>
            {/* <Image style={styles.logoImg} source={logoImg} /> */}
            <Text style={styles.sectionTitle}>Бүртгүүлэх</Text>
            <Text style={styles.paragraph}>Та мэдээллээ бөглөн бүртгүүлнэ үү.</Text>
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Нэр</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Нэр бичих"
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              value={values.userName}
              placeholderTextColor="#A9A9A9"
            />
          </View>
          {errors.userName && touched.userName ? (
            <Text style={styles.errorText}>{errors.userName}</Text>
          ) : null}

          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Дугаар</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Утасны дугаар бичих"
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
            <Text style={styles.labelText}>И-мэйл</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="И-мэйлээ бичих"
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
            <Text style={styles.labelText}>Нууц үг</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Нууц үг бичих"
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
            <Text style={styles.labelText}>Нууц үг давтах</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Нууц үг бичих"
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Бүртгүүлэх</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Бүртгэлтэй хэрэглэгч үү?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Нэвтрэх</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
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
    paddingTop: 35,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    paddingBottom: 20,
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    color: '#474747',
    paddingBottom: 15,
    paddingHorizontal: 20,
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
  icon: {
    fontSize: 20,
    color: '#A9A9A9',
    marginRight: 10,
  },
  logoImg: {
    // marginTop: 30,
    width: 105,
    height: 62,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom:34,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  loginContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  loginText: {
    color: '#8B8E95',
  },
  loginLink: {
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
    marginTop: 20,
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default SignupScreen;
