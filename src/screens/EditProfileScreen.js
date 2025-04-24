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

const EditProfileScreen = ({ navigation }) => {
  const { token, logout, userInfo, setUserInfo } = useContext(AuthContext);
  console.log(userInfo, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
  const [email, setEmail] = useState(userInfo.email);
  const [userName, setUserName] = useState(userInfo.userName);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
  const [password, setPassword] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Loading state for update
  const [loadingLogout, setLoadingLogout] = useState(false); // Loading state for logout

  const emailRef = useRef(null);
  const userNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const handleUpdate = async () => {

    setLoadingUpdate(true); // Start loading indicator for update

    try {
      console.log(userName, "eneeeeeeeeeee uurchilj bnudaaaaaaaaaa")
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


  return (
    <View style={styles.container}>
   
      <FlexHeader headerText={"Мэдээлэл өөрчлөх"} navigation={navigation}/> 

      <View style={styles.section}>
        <View >
          <Text style={styles.labelText}>Нэр</Text>
        </View>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Хэрэглэгчийн нэр"
          value={userName}
          onChangeText={setUserName}
          keyboardType="default" 
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
          returnKeyType="next"
          onSubmitEditing={() => phoneNumberRef.current.focus()}
          ref={userNameRef}
        />

        </View>
        <View >
          <Text style={styles.labelText}>Утасны дугаар</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Утасны дугаар"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
            placeholderTextColor="#A9A9A9"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            ref={phoneNumberRef}
          />
        </View>
        <View >
          <Text style={styles.labelText}>И-мэйл</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="И-мэйл"
            value={email}
            onChangeText={setEmail}
            keyboardType="phone-pad"
            autoCapitalize="none"
            placeholderTextColor="#A9A9A9"
            returnKeyType="next"
            ref={emailRef}
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
    paddingVertical:16
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

export default EditProfileScreen;
