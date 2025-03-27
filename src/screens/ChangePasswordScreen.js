import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateUser as updateUserApi } from '../api/user';
import FlexHeader from '../components/FlexHeader';

const ChangePasswordScreen = ({ navigation }) => {
  const { token, logout, userInfo, setUserInfo } = useContext(AuthContext);
  const [email, setEmail] = useState(userInfo.email);
  const [userName, setUserName] = useState(userInfo.userName);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Loading state for update
  const [loadingLogout, setLoadingLogout] = useState(false); // Loading state for logout

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

    setLoadingUpdate(true); // Start loading indicator for update

    try {
      const updatedUser = await updateUserApi(token, {
        id: userInfo.id,
        email,
        userName,
        phoneNumber,
        password,
      });
      setUserInfo(updatedUser);
      Alert.alert('Амжилттай', 'Таны мэдээлэл амжилттай шинэчлэгдлээ.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user information');
      console.log('Error msg update hiihed:', error);
    } finally {
      setLoadingUpdate(false); // Stop loading indicator for update
    }
  };

  const handleLogout = async () => {
    setLoadingLogout(true); // Start loading indicator for logout

    try {
      await logout(token);
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    } finally {
      setLoadingLogout(false); // Stop loading indicator for logout
    }
  };

  return (
    <View style={styles.container}>
   
      <FlexHeader headerText={"Нууц үг солих"} navigation={navigation}/> 

      <View style={styles.section}>
        
        

        <View >
          <Text style={styles.labelText}>Одоогийн нууц үг</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            keyboardType="phone-pad"
            autoCapitalize="none"
            placeholderTextColor="#A9A9A9"
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
          />
        </View>
        <View >
          <Text style={styles.labelText}>Шинэ нууц үг</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
           style={styles.input}
           placeholder="Нууц үг"
           value={password}
           onChangeText={setPassword}
           secureTextEntry
           keyboardType="phone-pad"
           autoCapitalize="none"
           placeholderTextColor="#A9A9A9"
           returnKeyType="next"
           onSubmitEditing={() => confirmPasswordRef.current.focus()}
           ref={passwordRef}
          />
        </View>
        <View >
          <Text style={styles.labelText}>Шинэ нууц үг давтах</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Шинэ нууц үг"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            keyboardType="phone-pad"
            autoCapitalize="none"
            secureTextEntry
            placeholderTextColor="#A9A9A9"
            returnKeyType="done"
            ref={confirmPasswordRef}  
          />
        </View>
    
      <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loadingUpdate || loadingLogout}>
        {loadingUpdate ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Хадгалах</Text>
        )}
      </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
    backgroundColor:'#fff'
  },
  section:{
    paddingHorizontal:20,
    paddingVertical:32
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    paddingBottom: 20,
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
    borderRadius: 16,
    marginBottom: 16,
    width: '100%',
    height: 55,
  },
  input: {
    paddingHorizontal:16,
    paddingVertical:12,
    fontSize:14,
    
    flex: 1,
    height: '100%',
  },
  icon: {
    fontSize: 20,
    color: '#A9A9A9',
    marginRight: 10,
  },
 
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#50B86C',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:16, 
    paddingVertical:8,
    marginTop:8
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 16,
    lineHeight:24,
    fontWeight: '500',
    fontFamily:"Inter-Medium"
  },
});
export default ChangePasswordScreen;
