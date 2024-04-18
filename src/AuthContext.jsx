import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const login = (userData) => {
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




//CON TOKEN?


// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext({
//   authToken: null,
//   setAuthToken: () => {}
// });

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(null);

//   const login = (token) => {
//     setAuthToken(token);
//     localStorage.setItem('authToken', token); // Guardar el token en el almacenamiento local
//   };

//   const logout = () => {
//     setAuthToken(null);
//     localStorage.removeItem('authToken'); // Eliminar el token del almacenamiento local
//   };

//   return (
//     <AuthContext.Provider value={{ authToken, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);