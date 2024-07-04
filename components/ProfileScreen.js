import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';


const ProfileScreen = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const createUser = async () => {
    try {
      const response = await fetch('http://192.168.100.37:3003/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phoneNumber,
        }),
      });
      const data = await response.json();
      setUsers([...users, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Users:</Text>
      {users.map((user) => (
        <Text key={user.id}>{user.email}</Text>
      ))}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Create User" onPress={createUser} />
    </View>
  );
};

export default ProfileScreen;
