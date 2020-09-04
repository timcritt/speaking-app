import React, { useState } from 'react';
import { authMethods } from '../firebase/authMethods';

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const handleSignup = (email, password) => {
    authMethods.signup(
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      setUserId,
      setUserEmail
    );
  };
  const handleSignin = (email, password) => {
    authMethods.signin(
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      setUserId,
      setUserEmail
    );
  };
  const handleSignout = () => {
    authMethods.signout(setErrors, setToken, setUserId);
  };

  return (
    <firebaseAuth.Provider
      value={{
        handleSignup,
        handleSignin,
        inputs,
        setInputs,
        errors,
        handleSignout,
        token,
        userId,
        userEmail,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;

export const firebaseAuth = React.createContext();
