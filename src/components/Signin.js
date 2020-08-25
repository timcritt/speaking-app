// add useContext
import React, { useContext } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const Signin = () => {
  const { handleSignup, handleSignin, inputs, setInputs, errors } = useContext(
    firebaseAuth
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignin(inputs.email, inputs.password);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

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
          <span>forgotten password</span>
        </div>
        {errors.length > 0
          ? errors.map((error) => (
              <p key={error.key} style={{ color: 'red' }}>
                {error}
              </p>
            ))
          : null}
      </form>
    </div>
  );
};

export default Signin;
