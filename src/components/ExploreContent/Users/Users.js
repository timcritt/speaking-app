import React from 'react';

import UserSummary from 'components/common/UserSummary';

const Users = ({ users }) => {
  return (
    <div>
      {users && users.length ? (
        <div className='all-tests-container'>
          {users.map((doc) => (
            <UserSummary key={doc.userId} user={doc} />
          ))}
        </div>
      ) : (
        <div className='search-results-message'>
          <span>no results!</span>
        </div>
      )}
    </div>
  );
};

export default Users;
