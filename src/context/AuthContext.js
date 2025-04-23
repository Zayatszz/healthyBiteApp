import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../api/user'; // энэ оруулна

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); //app эхлэхэд ачаалж буй эсэх

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          const parsedUser = JSON.parse(storedUser);

          // ✅ getUserById-аар backend-ээс бүрэн мэдээлэл (healthInfo гэх мэт) авч байна
          const fullUser = await getUserById(parsedUser.id);
          setUserInfo(fullUser);
        }
      } catch (err) {
        console.error("Auto-login error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (newToken, user) => {
    setToken(newToken);
    setUserInfo(user);
    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    setToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userInfo, setUserInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
