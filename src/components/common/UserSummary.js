import React from 'react';
import profilePlaceHolder from 'img/profile-placeholder.png';
import { useHistory } from 'react-router-dom';

const UserSummary = ({ user }) => {
  const history = useHistory();

  return (
    <div
      className='test-preview-container'
      onClick={() => history.push(`/userContent/${user.id}/tests`)}
    >
      <div className='user-summary-container '>
        <img
          className='profile-detail-picture'
          alt='could not load'
          src={user.profilePicture ? user.profilePicture : profilePlaceHolder}
        />
        <h3 className='created-by-text '>{user.userName}</h3>
      </div>
    </div>
  );
};

export default UserSummary;
