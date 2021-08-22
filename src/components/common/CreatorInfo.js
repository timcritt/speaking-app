import React, { useState } from 'react';
import defaultProfilePicture from 'img/profile-placeholder.png';
import { Link } from 'react-router-dom';
import getUserDetails from 'APIHandlers/getUserDetails';

const CreatorInfo = ({ creatorId }) => {
  const [authorName, setAuthorName] = useState(null);
  const [creatorProfilePicture, setCreatorProfilePicture] = useState(null);

  if (creatorId) {
    (async () => {
      const creatorDetails = await getUserDetails(creatorId);
      console.log(creatorDetails);
      setAuthorName(creatorDetails.userName);
      setCreatorProfilePicture(creatorDetails.profilePicture);
    })();
  }

  const addDefaultSrc = (e) => {
    e.target.src = defaultProfilePicture;
  };

  return (
    <div className='test-creator-info'>
      <span className='hide-on-fullscreen'>
        <img
          onError={addDefaultSrc}
          className='profile-picture-small'
          src={creatorProfilePicture ? creatorProfilePicture : defaultProfilePicture}
        />
        <div className='created-by-text'>
          <div>creator: </div>
          {
            <Link className={'nav-link'} to={`/userContent/${creatorId}/tests`}>
              {authorName}
            </Link>
          }
        </div>
      </span>
    </div>
  );
};

export default CreatorInfo;
