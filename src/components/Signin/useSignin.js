import React, { useContext } from 'react';
import { firebaseAuth } from '../../context/AuthProvider';
import { useHistory } from 'react-router-dom';

const useSignin = () => {
  const history = useHistory();

  const {
    inputs,
    setInputs,
    errors,
    setErrors,
    handleSignin,
    setToken,
    setEmailVerified,
    setUserId,
    handleSendEmailVerification,
  } = useContext(firebaseAuth);

  const handleResendEmail = () => {
    handleSendEmailVerification();
  };

  const signin = async () => {
    try {
      const { token, emailVerified, userId } = await handleSignin(inputs.email, inputs.password);
      if (token) {
        setUserId(userId);
        setToken(token);
        setEmailVerified(emailVerified);
        if (emailVerified) {
          if (history.location.pathname === '/signin') {
            history.push(`/userContent/${userId}/tests`);
          } else {
            history.push('/');
          }
        } else {
          setErrors([
            'Before using your account, you must verify your email. Please check your email.',
            <span onClick={handleResendEmail}>'Click here to resend the verification email'</span>,
          ]);
        }
      }
    } catch (error) {}
  };

  return { signin, inputs, setInputs, errors, setErrors };
};

export default useSignin;
