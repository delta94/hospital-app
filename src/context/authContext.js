import React, { createContext } from 'react';
import { getItemFromLocal } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const user = getItemFromLocal('user');

  return <AuthContext.Provider value={{ user }}>
    {children}
  </AuthContext.Provider>
}

export default AuthContextProvider;
