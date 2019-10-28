import React, { createContext, useState, useEffect } from 'react';
import { getItemFromLocal } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getItemFromLocal('user'));
  }, []);

  const setLocalUserToContext = user => setUser(user);


  return (
    <AuthContext.Provider value={{ user, setLocalUserToContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
