import React from 'react';
import profilePlaceHolder from 'img/profile-placeholder.png';
import { useHistory } from 'react-router-dom';

const UserSummary = ({ user }) => {
  const history = useHistory();

  return (
    <div
      className='user-summary-container test-preview-container'
      onClick={() => history.push(`/userContent/${user.id}/tests`)}
    >
      <img
        className='profile-detail-picture'
        src={user.profilePicture ? user.profilePicture : profilePlaceHolder}
      />
      <h3 className='created-by-text '>{user.userName}</h3>
    </div>
  );
};

export default UserSummary;
