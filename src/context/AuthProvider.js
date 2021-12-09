import React, { useState, useEffect } from 'react';
import getUserDetails from '../APIHandlers/getUserDetails';
import { authMethods } from '../firebase/authMethods';
import { app } from '../firebase/firebaseIndex';

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  function handleSetUserId(newId) {
    console.log('new id inside the provider', newId);
    setUserId(newId);
  }

  useEffect(() => {
    //listens to state change. Persists login even after refresh
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setToken(window.localStorage.token);
        setUserEmail(user.email);
        setUserId(user.uid);
        const newDetails = await getUserDetails(user.uid);
        setUserDetails(newDetails);
        setErrors([]);
      }
    });
  }, []);

  const handleSignup = async (userName, imageLocalUrl) => {
    return await authMethods.signup(
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      handleSetUserId,
      setUserEmail,
      setUserDetails,
      userName,
      imageLocalUrl
    );
  };
  const handleSignin = (email, password) => {
    authMethods.signin(
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      setUserId,
      setUserEmail,
      setUserDetails
    );
  };
  const handleSignout = () => {
    authMethods.signout(setErrors, setToken, setUserId);
  };
  const handleResetPassword = () => {
    authMethods.sendPasswordResetEmail(inputs.email, setUserEmail, setErrors);
  };
  //checks if the email address is registered to a user in the database
  const handleVerifyEmailExists = async (email, setErrors) => {
    return await authMethods.verifyEmailExistsInDatabase(email, setErrors);
  };

  return (
    <firebaseAuth.Provider
      value={{
        handleSignup,
        handleSignin,
        inputs,
        setInputs,
        setErrors,
        errors,
        handleSignout,
        handleVerifyEmailExists,
        token,
        userId,
        userDetails,
        setUserDetails,
        userEmail,
        handleResetPassword,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;

export const firebaseAuth = React.createContext();
