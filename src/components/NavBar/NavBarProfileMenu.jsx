import React from 'react';
import { Link } from 'react-router-dom';

import defaultProfilePicture from 'img/profile-placeholder.png';

const NavBarProfileMenu = ({ userDetails, userId, logoutAndRedirect }) => {
  return (
    <div className='dropdown'>
      <img
        className='profile-picture dropdown '
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
  );
};

export default NavBarProfileMenu;
