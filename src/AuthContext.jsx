// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken)
    console.log(storedToken);

    if (storedToken) {
      fetchUser(storedToken);
      setIsLoggedIn(true)
    }
  }, []);
  console.log(token);

  const fetchUser = async (token) => {
    const api_url = import.meta.env.VITE_REACT_APP_API_URL;
    try {
      const response = await axios.get(`${api_url}/protected`, {
        headers: {
          'auth-token': token,
        },
      });

      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoggedIn(true); // Set the user as logged in
      }
    } catch (err) {
      // Handle errors as needed
      console.error('Failed to fetch user data:', err);
    }
  };


  const logout = () => {
    // Implement logout functionality, remove the token, and reset the user state
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    setUser(null);
  };
// console.log(user);
  return (
    <AuthContext.Provider value={{ user, logout, isLoggedIn, setUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};