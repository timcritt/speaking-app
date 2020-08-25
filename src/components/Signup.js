// add useContext
import React, { useContext } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import { withRouter } from 'react-router-dom';

const Signup = (props) => {
  const { handleSignup, inputs, setInputs, errors } = useContext(firebaseAuth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    //wait to signup
    await handleSignup();
    //push home
    props.history.push('/');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(inputs);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSubmit}>
        {/* replace the div tags with a form tag */}
        Signup
        {/* make inputs  */}
        <input
          className='auth-input'
          onChange={handleChange}
          name='email'
          placeholder='email'
          value={inputs.email}
        />
        <input
          className='auth-input'
          onChange={handleChange}
          name='password'
          placeholder='password'
          value={inputs.password}
        />
        <button className='auth-button'>signup</button>
        {errors.length > 0
          ? errors.map((error) => <p style={{ color: 'red' }}>{error}</p>)
          : null}
      </form>
    </div>
  );
};

export default withRouter(Signup);
