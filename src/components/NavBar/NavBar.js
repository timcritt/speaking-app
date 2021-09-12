import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import defaultProfilePicture from 'img/profile-placeholder.png';

import { firebaseAuth } from 'context/AuthProvider';
import { useHistory } from 'react-router';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

export const NavBar = () => {
  const { token, handleSignout, userId, userDetails } = useContext(firebaseAuth);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  let history = useHistory();

  const logoutAndRedirect = async () => {
    await handleSignout();
    history.push('/');
  };

  // const toggleViewNavMobile = () => {
  //   setMobileNavVisible((prevState) => !prevState);
  // };

  return (
    <div className='nav-container'>
      <div className={'burger-btn'} onClick={() => setMobileNavVisible(true)}>
        <MenuIcon fontSize='large' />
      </div>

      <div className={`nav-content-container ${mobileNavVisible ? 'isVisible' : 'isHidden'}`}>
        <div className='close-nav-mobile-btn' onClick={() => setMobileNavVisible(false)}>
          <CloseIcon fontSize='large' />
        </div>
        <Link className='nav-link navItem nav-logo ' to='/home'>
          Orzilla
        </Link>
        <div className='nav-buttons'>
          {token && (
            <Fragment>
              <Link className='nav-link create-link navItem' to='/create'>
                Create
              </Link>
              <Link className='nav-link' to={`/userContent/${userId}/tests`}>
                My content
              </Link>
            </Fragment>
          )}
          <Link className='nav-link navItem' to='/about'>
            About
          </Link>
          <Link className='nav-link navItem' to='/about'>
            Help
          </Link>
          <Link className='nav-link navItem' to='/exploreContent/tests'>
            Explore content
          </Link>
        </div>
      </div>
      {token ? (
        <div className='dropdown-m'>
          <img
            className='profile-picture dropdown '
            alt='could not load'
            src={
              userDetails && userDetails.profilePicture
                ? userDetails.profilePicture
                : defaultProfilePicture
            }
          ></img>
          <div className='dropdown-content'>
            <Link to={`/profile/${userId}`}>
              <p className='nav-dropdown-link'>Profile</p>
            </Link>
            <p className='nav-dropdown-link'>Settings</p>
            <p className='nav-dropdown-link' onClick={logoutAndRedirect}>
              Log out
            </p>
            <p className='nav-dropdown-link'>Invite friends</p>
          </div>
        </div>
      ) : (
        <Fragment>
          <Link className='nav-link' to='/signin'>
            Log in
          </Link>
          <Link className='nav-link' to='/signup'>
            Sign up
          </Link>
        </Fragment>
      )}
    </div>
  );
};
