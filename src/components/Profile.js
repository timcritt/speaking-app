import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import getUserDetails from '../APIHandlers/getUserDetails';
import profilePlaceHolder from '../img/profile-placeholder.png';

const Profile = () => {
  const userId = useParams().userId;
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    (async () => {
      const details = await getUserDetails(userId);
      setUserDetails(details);
    })();
  }, [userId]);

  return (
    <div className='holy-grail-body'>
      <main className='holy-grail-content fade-in'>
        {userDetails && (
          <Fragment>
            <div className='profile-user-info-container'>
              <img className='dashboard-image' src={profilePlaceHolder}></img>
              <div>{userDetails.userName}</div>
              <div>{userDetails.email}</div>
              <div>change password</div>
              <div>member since: a date</div>
            </div>
          </Fragment>
        )}
      </main>
    </div>
  );
};

export default Profile;
