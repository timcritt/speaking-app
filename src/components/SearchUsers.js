import React, { Fragment } from 'react';
import Users from './Users';

const SearchUsers = () => {
  return (
    <Fragment>
      <div className='user-search-bar'>
        <input
          className='user-search-input'
          placeholder='enter the name of a user'
        ></input>
        <button className='user-search-button'>search</button>
      </div>
      <Users />
    </Fragment>
  );
};

export default SearchUsers;
