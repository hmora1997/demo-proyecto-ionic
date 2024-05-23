import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserData = Cookies.get('userData');
    console.log('AuthContext: useEffect storedUserData', storedUserData);
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log('AuthContext: login', userData);
    setUserData(userData);
    Cookies.set('userData', JSON.stringify(userData), { expires: 365 });
  };

  const logout = () => {
    console.log('AuthContext: logout');
    setUserData(null);
    Cookies.remove('userData');
    console.log('AuthContext: userData after logout', Cookies.get('userData'));
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
