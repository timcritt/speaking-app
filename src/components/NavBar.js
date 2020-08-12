import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className='nav-container'>
      <Link className='nav-link' to='/home'>
        Home
      </Link>
      <Link className='nav-link' to='/about'>
        About
      </Link>
    </div>
  );
};
