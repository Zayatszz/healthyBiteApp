import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    };

    loadToken();
  }, []);

  const login = async (newToken, user) => {
    setToken(newToken);
    setUserInfo(user);
    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem('user', JSON.stringify(user)); // Convert user object to JSON string
  };

  const logout = async () => {
    setToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
