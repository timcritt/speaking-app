import React, { useState, useEffect } from 'react';
import { authMethods } from '../firebase/authMethods';
import { app } from '../firebase/firebaseIndex';

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    //listens to state change. Persists login even after refresh
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setToken(window.localStorage.token);
        setUserEmail(user.email);
        setUserId(user.uid);
      }
    });
  }, []);

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
