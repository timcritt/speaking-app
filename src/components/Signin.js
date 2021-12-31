// add useContext
import React, { useContext, useEffect } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const Signin = ({ history }) => {
  const {
    handleSignin,
    inputs,
    setInputs,
    errors,
    setErrors,
    setToken,

    setEmailVerified,
    setUserId,
    handleSendEmailVerification,
  } = useContext(firebaseAuth);

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleResendEmail = () => {
    handleSendEmailVerification();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, emailVerified, userId } = await handleSignin(inputs.email, inputs.password);
      console.log('is verified?', emailVerified);

      console.log('line after handleSignin');
      if (token) {
        setUserId(userId);
        setToken(token);
        console.log(token);
        console.log('token is present');
        setEmailVerified(emailVerified);

        if (emailVerified) {
          if (history.location.pathname === '/signin') {
            history.push(`/userContent/${userId}/tests`);
            console.log('redirecting to user content');
          } else {
            console.log('pushing to home or prevously navigated page');
            history.push('/');
          }
        } else {
          setErrors([
            'Before using your account, you must verify your email. Please check your email.',
            <span onClick={handleResendEmail}>'Click here to resend the verification email'</span>,
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   let isMounted = true;
  //   //redirectes to users content page if login successful and login page hasn't been reached from trying to access a private route
  //   if (isMounted) {
  //     if (token) {
  //       if (emailVerified) {
  //         if (history.location.pathname === '/signin') {
  //           history.push(`/userContent/${userId}/tests`);
  //         } else {
  //           history.push('/');
  //         }
  //       } else {
  //         history.push('/verifyEmail');
  //       }
  //     }
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [emailVerified, history, token, userId]);

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <div className='auth-help-container'>
          <span>
            Don't have an account? &nbsp;
            <Link className='auth-link' to='/signup'>
              <span className='auth-link-bold'>Sign up.</span>
            </Link>
          </span>
        </div>
        <input
          className='auth-input'
          onChange={handleChange}
          name='email'
          placeholder='email'
          value={inputs.email}
        />

        <input
          type='password'
          className='auth-input'
          onChange={handleChange}
          name='password'
          placeholder='password'
          value={inputs.password}
        />
        <button className='auth-button'>log in</button>
        <div className='auth-help-container'>
          <Link className='auth-link' to='/resetPassword'>
            <span>forgotten password?</span>
          </Link>
        </div>
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
};

export default Signin;
