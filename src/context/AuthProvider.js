import React, { useState } from 'react';
import { authMethods } from '../firebase/authMethods';

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);

  const handleSignup = (email, password) => {
    // middle man between firebase and signup
    console.log('handleSignup');
    // calling signup from firebase server

    authMethods.signup(inputs.email, inputs.password, setErrors, setToken);
    console.log(errors, token);
  };
  const handleSignin = (email, password) => {
    console.log('handleSignuin!!');

    authMethods.signin(inputs.email, inputs.password, setErrors, setToken);
    console.log(errors, token);
  };
  const handleSignout = () => {
    authMethods.signout(setErrors, setToken);
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
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;

export const firebaseAuth = React.createContext();
