// add useContext
import React, { useContext, useState, useEffect } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import { Link, withRouter } from 'react-router-dom';
import ImageContext from 'context/ImageContext';
import profilePlaceHolder from 'img/profile-placeholder.png';
import ProfilePickerModal from 'components/Profile/ProfilePickerModal';

const Signup = (props) => {
  const { handleSignup, inputs, setInputs, errors } = useContext(firebaseAuth);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [imageLocalUrl, setImageLocalUrl] = useState(profilePlaceHolder);
  const [userName, setUserName] = useState('heki');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      // console.log('userId before signup', userId);
      //signs up and returns the user id. Changes to userId made from inside authMethods weren't reflected here
      //not sure why. I changed "signup" in authMethodhandle to return value of userId, which gets passed up the chain.
      const newUserId = await handleSignup(userName, imageLocalUrl);
      props.history.push(`/userContent/${newUserId}/tests`);
    } catch (err) {
      setIsDisabled(false);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleRepeatUserNameChange = (e) => {
    setRepeatPassword(e.target.value);
  };
  const handleChangeUserName = (e) => {
    setUserName(e.target.currentValue);
  };

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
        <div>
          <img alt='could not load' className='profile-detail-picture' src={imageLocalUrl} />

          <div className='profile-name-container'>
            <ImageContext.Provider value={{ handleSetProfilePicture: setImageLocalUrl }}>
              <ProfilePickerModal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
              ></ProfilePickerModal>
            </ImageContext.Provider>
          </div>
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
        <input
          type='password'
          className='auth-input'
          onChange={handleRepeatUserNameChange}
          name='repeat-password'
          placeholder='repeat password'
          value={repeatPassword}
        />
        <input
          type='text'
          className='auth-input'
          onChange={handleChangeUserName}
          name='userName'
          placeholder='user name'
          value={userName}
        />
        <button className='auth-button' disabled={isDisabled}>
          sign up
        </button>
        {errors.length > 0 ? errors.map((error) => <p style={{ color: 'red' }}>{error}</p>) : null}
        <div className='auth-help-container'>
          <span>
            Already have an account? &nbsp;
            <Link className='auth-link' to='/signin'>
              <span className='auth-link-bold'>Log in.</span>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Signup);
