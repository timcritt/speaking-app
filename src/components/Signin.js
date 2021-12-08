// add useContext
import React, { useContext, useEffect } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import { Link, matchPath } from 'react-router-dom';

const Signin = ({ history }) => {
  const { handleSignin, inputs, setInputs, errors, setErrors, token, userId } =
    useContext(firebaseAuth);

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignin(inputs.email, inputs.password);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    //redirectes to users content page if login successful and login page hasn't been reached from trying to access a private route
    if (token) {
      console.log(history.location.pathname);
      if (history.location.pathname === '/signin') {
        history.push(`/userContent/${userId}/tests`);
      } else {
        history.push('/');
      }
    }
  }, [history, token, userId]);

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
