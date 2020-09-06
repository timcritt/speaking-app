import React, { Fragment, useContext, useState } from 'react';
import Tests from './Tests';
import { firebaseAuth } from '../context/AuthProvider';
import FilterInput from './FilterInput';

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
        <FilterInput
          placeholder={'filter by question'}
          handleSetFilterTerm={handleSetFilterTerm}
        />
      </div>
      <Tests userId={userId} filterTerm={filterTerm} />
    </Fragment>
  );
};

export default MyTests;
