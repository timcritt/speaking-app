import React, { Fragment, useState, useEffect } from 'react';
import Users from './Users';
import useFirestore from '../../../hooks/useFirestore';
import { users } from '../../../APIHandlers/firebaseConsts';
import useGetUsers from './useGetUsers';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState();

  const { docs } = useGetUsers(searchTerm);

  const handleChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <Fragment>
      <div className='user-search-bar'>
        <input
          defaultValue={searchTerm}
          className='user-search-input'
          placeholder='enter the name of a user'
          onChange={handleChange}
        ></input>
        <button className='user-search-button'>search</button>
      </div>
      <Users users={docs} />
    </Fragment>
  );
};

export default SearchUsers;
