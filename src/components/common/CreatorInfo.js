import React, { useState, useEffect } from 'react';
import defaultProfilePicture from 'img/profile-placeholder.png';
import { Link } from 'react-router-dom';
import getUserDetails from 'APIHandlers/getUserDetails';

const CreatorInfo = ({ creatorId }) => {
  const [authorName, setAuthorName] = useState(null);
  const [creatorProfilePicture, setCreatorProfilePicture] = useState(null);

  useEffect(() => {
    var unmounted = false;

    if (creatorId) {
      (async () => {
        const creatorDetails = await getUserDetails(creatorId);
        if (!unmounted) {
          setAuthorName(creatorDetails.userName);
          setCreatorProfilePicture(creatorDetails.profilePicture);
        }
      })();
    }
    return () => {
      unmounted = true;
    };
  }, [creatorId]);

  const addDefaultSrc = (e) => {
    e.target.src = defaultProfilePicture;
  };

  return (
    <div className='test-creator-info'>
      <span className='hide-on-fullscreen'>
        <img
          onError={addDefaultSrc}
          alt='could not load'
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
