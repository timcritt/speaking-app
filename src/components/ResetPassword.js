import React, { useContext, useEffect } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { ThemeConsumer } from 'styled-components';

function ResetPassword({ history }) {
  const { handleResetPassword, inputs, setInputs, errors, setErrors, handleVerifyEmailExists } =
    useContext(firebaseAuth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailExists = await handleVerifyEmailExists(inputs.email, setErrors);
      if (emailExists) {
        await handleResetPassword(inputs.email);
        history.push('/resetPassWordConfirmation');
      } else {
        setErrors(['email is not registered']);
      }
    } catch (error) {
      //setErrors([error.message]);
    }
  };

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <div className='auth-help-container'>
          enter the email address that you used to create your account. You will receive and email
          shortly with a link to reset your password.
        </div>
        <input
          className='auth-input'
          onChange={handleChange}
          name='email'
          placeholder='email'
          value={inputs.email}
        />
        <button className='auth-button'>Reset Password</button>
        <div className='auth-help-container'></div>
        {errors.length > 0
          ? errors.map((error) => (
              <p key={error} style={{ color: 'red' }}>
                {error}
              </p>
            ))
          : null}
      </form>
    </div>
  );
}

export default ResetPassword;
