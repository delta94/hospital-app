import React, {createContext, useState, useEffect} from 'react';
import { getItemFromLocal } from '../utils/localStorage';
import { config } from '../config';

export const AvatarContext = createContext();

const AvatarContextProvider = ({ children }) => {

  const [avatar, setAvatar] = useState('');
  const updateAvatarContext = (data) => setAvatar(data);

  // useEffect(() => {
  //   const user = getItemFromLocal('user');
  //   setAvatar(user.avatar);
  // });

  return (
    <AvatarContext.Provider value={{ avatar, updateAvatarContext }}>
      {children}
    </AvatarContext.Provider>
  );
};

export default AvatarContextProvider;
