import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateUser as updateUserApi } from '../api/user';

const ProfileScreen = ({navigation}) => {
  const { token, logout, userInfo, setUserInfo } = useContext(AuthContext);
  const [email, setEmail] = useState(userInfo.email);
  const [userName, setUserName] = useState(userInfo.userName);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef(null);
  const userNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const updatedUser = await updateUserApi(token, {
        id: userInfo.id,
        email,
        userName,
        phoneNumber,
        password,
      });
      setUserInfo(updatedUser);
      Alert.alert('Success', 'User information updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user information');
      console.log("Error msg update hiihed:", error)
    }
  };

  const handleLogout = async () => {
    try {
      await logout(token);
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Profile</Text>

      <View style={styles.labelContainer}>
        <Text>Email</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name='user-o' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
          returnKeyType="next"
          onSubmitEditing={() => firstNameRef.current.focus()}
          ref={emailRef}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text>User Name</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name='user-o' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
          placeholderTextColor="#A9A9A9"
          returnKeyType="next"
          onSubmitEditing={() => phoneNumberRef.current.focus()}
          ref={userNameRef}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text>Phone Number</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name='phone' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor="#A9A9A9"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          ref={phoneNumberRef}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text>Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name='lock-closed-outline' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          ref={passwordRef}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text>Confirm Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name='lock-closed-outline' style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
          returnKeyType="done"
          ref={confirmPasswordRef}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Шинэчлэх</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Гарах</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>
        navigation.navigate('MyOrders')
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'MyOrders' }],
        // })
        }>
        <Text style={styles.buttonText}>Миний захиалгууд</Text>
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
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    paddingBottom: 20,
  },
  labelContainer: {
    marginBottom: 10,
    marginLeft: 10,
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
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#1E90FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
