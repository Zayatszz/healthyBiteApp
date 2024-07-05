import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const [users, setUsers] = useState([]);
  // const logout = useContext(AuthContext);
  const { token, logout } = useContext(AuthContext);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.100.37:3003/users');
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(token);
    } catch (error) {
     
    }
  };

 
  return (
    <View>
      <Text>Users:</Text>
      {users.map((user) => (
        <Text key={user.id}>{user.email}</Text>
      ))}
  
  <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Гарах</Text>
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
export default ProfileScreen;
