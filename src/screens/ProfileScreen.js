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
import { Image } from 'moti';
import Feather from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  const { token, logout, userInfo, setUserInfo } = useContext(AuthContext);
  const [email, setEmail] = useState(userInfo.email);
  const [userName, setUserName] = useState(userInfo.userName);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Loading state for update
  const [loadingLogout, setLoadingLogout] = useState(false); // Loading state for logout

  console.log(userInfo, "from profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
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
   
      <FlexHeader headerText={"Профайл"} navigation={navigation}/> 
      <View style={[styles.profileSection, styles.flex]}> 
        <Image style={styles.profileImg} source={require("../../assets/carwashApp1.png")} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userInfo.userName}</Text>
          <Text style={styles.text12}>{userInfo.email}</Text>
        </View>
      </View>
      <View style={styles.infoOrder}>
        <TouchableOpacity style={[styles.info, styles.flex]} onPress={() => navigation.navigate('MyOrders')} disabled={loadingUpdate || loadingLogout}> 
          <View style={styles.flex}>
            <Feather name='server' style={styles.icon} />
            <Text style={styles.text}>Миний захиалгууд</Text>
          </View>
          <Feather name='chevron-right' style={[styles.icon ]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.info, styles.flex]} onPress={() => navigation.navigate('EditProfile')} disabled={loadingUpdate || loadingLogout}> 
          <View style={styles.flex}> 

            <Feather name='user' style={styles.icon} />
            <Text style={styles.text}>Хувийн мэдээлэл</Text>
          </View>
          <Feather name='chevron-right' style={[styles.icon ]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.info, styles.flex]} onPress={() => navigation.navigate('ChangePass')} disabled={loadingUpdate || loadingLogout}> 
        
          <View style={styles.flex}> 

            <Feather name='lock' style={styles.icon} />
            <Text style={styles.text}>Нууц үг солих</Text>
          </View>
          <Feather name='chevron-right' style={[styles.icon ]} />
        </TouchableOpacity>
        
        {/* <View style={[styles.info, styles.flex]} onPress={handleLogout}> 
          <Feather name='log-out' style={styles.icon} />
          <Text style={styles.text}>Гарах</Text>
        </View> */}
        <TouchableOpacity style={[styles.info, styles.flex]} onPress={handleLogout}> 
          <Feather name='log-out' style={styles.icon} />
          <Text style={styles.text}>Гарах</Text>
        </TouchableOpacity>
      </View>


      {/* <TouchableOpacity style={styles.button} onPress={handleLogout} disabled={loadingUpdate || loadingLogout}>
        {loadingLogout ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Гарах</Text>}
      </TouchableOpacity> */}
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  profileSection:{
    paddingVertical:36,
    paddingHorizontal:20
  },
  infoOrder:{
    paddingHorizontal:20
  },
  info:{
    marginBottom:16,
    paddingHorizontal:24,
    paddingVertical:16,
    borderWidth:1,
    borderRadius:8,
    borderColor:"#dadada"
  },

  flex: {
  
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  userInfo:{
    paddingLeft:16,
   
  },
  userName:{
    fontSize:16,
    color: "#080b11",
  },
  text12:{
    fontSize:12,
    color: "#080b11",
  },

  text:{
    fontSize:16,
    color: "#000",
    paddingLeft:16
  },
  profileImg:{
    width: 90,
    height: 90,
    borderRadius: 50,
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
    paddingHorizontal: 20,
    
    marginBottom: 10,
    width: '100%',
    height: 45,
  },
  icon: {
    fontSize: 24,
    color: '#000',
    // paddingRight: 16,
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
