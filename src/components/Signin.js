// add useContext
import React, { useContext, useEffect } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

//custom hooks
import useSignin from 'hooks/useSignin';

const Signin = ({ history }) => {
  const { signin, inputs, setInputs, errors, setErrors } = useSignin();

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin();
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
        <div className='auth-help-container'>
          <Link className='auth-link' to='/resetPassword'>
            <span>forgotten password?</span>
          </Link>
        </div>
        <button className='auth-button'>log in</button>

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
