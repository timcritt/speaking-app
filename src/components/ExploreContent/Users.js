import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { users } from '../../APIHandlers/firebaseConsts';
import UserSummary from '../common/UserSummary';

const Users = () => {
  const { docs } = useFirestore(users);
  console.log(docs);
  return (
    <div>
      <div className='all-tests-container'>
        {docs && docs.length > 0 ? (
          docs.map((doc) => <UserSummary key={doc.id} user={doc} />)
        ) : (
          <div>
            <span>no results!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
