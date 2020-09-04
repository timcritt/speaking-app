import React, { Fragment, useContext, useState } from 'react';
import Tests from './Tests';
import { firebaseAuth } from '../context/AuthProvider';

const MyTests = () => {
  const [filterTerm, setFilterTerm] = useState('');

  const { userId } = useContext(firebaseAuth);

  const handleSetFilterTerm = (e) => {
    setFilterTerm(e.currentTarget.value);
    console.log(filterTerm);
  };

  return (
    <Fragment>
      <div className='my-tests-search-bar-container'>
        <input
          className='filter-input'
          placeholder='filter by question'
          onChange={(e) => handleSetFilterTerm(e)}
        ></input>
      </div>
      <Tests userId={userId} filterTerm={filterTerm} />
    </Fragment>
  );
};

export default MyTests;
