import React, { useContext } from 'react';
import { AuthContext } from '../authentication/AuthContext';


const AuthUser = () => {
  
    return useContext(AuthContext);
};

export default AuthUser;