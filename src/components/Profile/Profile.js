import React, { useState, Fragment, useContext, useEffect } from 'react';
import getUserDetails from 'APIHandlers/getUserDetails';
import profilePlaceHolder from 'img/profile-placeholder.png';
import EasyCrop from 'components/EasyCrop/EasyCrop';
import ProfilePickerModal from 'components/Profile/ProfilePickerModal';
import ImageContext from 'context/ImageContext';
import { uploadImage } from 'APIHandlers/uploadImage';
import {
  updateUserName,
  updateUserProfilePicture,
} from 'APIHandlers/updateUser';
import { firebaseAuth } from 'context/AuthProvider';

const Profile = () => {
  const { userDetails, setUserDetails, userId } = useContext(firebaseAuth);
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (userDetails) {
      setUserName(userDetails.userName);
    }
  }, [userDetails]);

  const handleSetProfilePicture = async (localURL) => {
    const { url, reference } = await uploadImage(localURL);
    console.log(url);
    await updateUserProfilePicture(url, reference, userId);
    const details = await getUserDetails(userId);
    setUserDetails(details);
  };

  const handleUpdateUserNameField = (e) => {
    setUserName(e.target.value);
  };

  const handleSaveChanges = async () => {
    await updateUserName(userId, userName);
    const details = await getUserDetails(userId);
    setUserDetails(details);
  };

  return (
    <div className='holy-grail-body'>
      <main className='holy-grail-content fade-in'>
        {userDetails && (
          <Fragment>
            <div className='profile-user-info-container'>
              <div className='profile-detail-item-container'>
                <aside className='profile-detail-label-aside'>
                  <img
                    className='profile-detail-picture'
                    src={
                      userDetails && userDetails.profilePicture
                        ? userDetails.profilePicture
                        : profilePlaceHolder
                    }
                  />
                </aside>
                <div className='profile-name-container'>
                  <div className='profile-username'>{userDetails.userName}</div>
                  <ImageContext.Provider value={handleSetProfilePicture}>
                    <ProfilePickerModal
                      aria-labelledby='simple-modal-title'
                      aria-describedby='simple-modal-description'
                    >
                      <EasyCrop aspect={1} />
                    </ProfilePickerModal>
                  </ImageContext.Provider>
                </div>
              </div>
              <div className='profile-detail-item-container'>
                <aside className='profile-detail-label-aside'>
                  <label htmlFor='email'>username</label>
                </aside>
                <div>
                  <input
                    className='input'
                    type='text'
                    name='user name'
                    id='userName'
                    defaultValue={userName}
                    onChange={(e) => handleUpdateUserNameField(e)}
                  />
                </div>
              </div>
              <div className='profile-detail-item-container'>
                <aside className='profile-detail-label-aside'>
                  <label htmlFor='email'>email</label>
                </aside>
                <div>
                  <input
                    className='input'
                    type='text'
                    name='email'
                    id='email'
                    defaultValue={userDetails.email}
                  />
                </div>
              </div>
              <div className='profile-detail-item-container'>
                <aside className='profile-detail-label-aside'></aside>
                <div className='profile-detail-save-btn btn'>
                  <button onClick={() => handleSaveChanges()}>
                    save changes
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </main>
    </div>
  );
};

export default Profile;
