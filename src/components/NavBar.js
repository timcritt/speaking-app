import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../img/my-profile-pic.jpg';
import { firebaseAuth } from '../context/AuthProvider';
import { useHistory } from 'react-router';

export const NavBar = () => {
  const { token, handleSignout } = useContext(firebaseAuth);

  let history = useHistory();

  const logoutAndRedirect = async () => {
    await handleSignout();
    history.push('/');
  };

  return (
    <div className='nav-container'>
      <Link className='nav-link nav-logo' to='/home'>
        Orzilla
      </Link>
      {token && (
        <Fragment>
          <Link className='nav-link create-link' to='/EditFCEPart2/new'>
            Create
          </Link>
          <Link className='nav-link' to='/mycontent'>
            My content
          </Link>
        </Fragment>
      )}
      <Link className='nav-link' to='/about'>
        About
      </Link>
      <Link className='nav-link' to='/about'>
        Help
      </Link>
      <Link className='nav-link' to='/tests'>
        Explore content
      </Link>

      {token ? (
        <div className='dropdown'>
          <img className='profile-picture dropdown ' src={profilePic}></img>
          <div className='dropdown-content'>
            <p className='nav-dropdown-link'>Profile</p>
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
