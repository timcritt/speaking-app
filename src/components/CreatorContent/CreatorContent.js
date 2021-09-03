import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import ContentRoutes from 'routers/ContentRoutes';
import DashBoardButton from 'components/common/DashBoardButton';
import getUserDetails from 'APIHandlers/getUserDetails';
import profilePlaceHolder from 'img/profile-placeholder.png';

const CreatorContent = () => {
  const creatorId = useParams().userId;
  const [creatorDetails, setCreatorDetails] = useState(null);

  useEffect(() => {
    if (creatorId) {
      (async () => {
        const details = await getUserDetails(creatorId);
        setCreatorDetails(details);
      })();
    }
  }, [creatorId]);

  let { url } = useRouteMatch();

  return (
    <main className='holy-grail-content fade-in'>
      <div className='my-content-content'>
        <div className='dashboard-container'>
          <div className='dashboard-user-info-container'>
            <div className='dashboard-profile-pic-container'>
              <img
                className='dashboard-image'
                src={
                  creatorDetails && creatorDetails.profilePicture
                    ? creatorDetails.profilePicture
                    : profilePlaceHolder
                }
              />
              <span className='content-title dashboard-user-name'>
                {creatorDetails && creatorDetails.userName}
              </span>
            </div>
          </div>
        </div>
        {/* router goes here */}
        <div className='my-content-main'>
          <div className='dashboard-button-bar-sm'>
            <DashBoardButton linkTo={`${url}/tests`} label={'Tests'} id={'tests'} />
            <DashBoardButton linkTo={`${url}/folders`} label={'Folders'} id={'folders'} />
          </div>
          {creatorDetails && <ContentRoutes url={url} creatorId={creatorDetails.userId} />}
        </div>
      </div>
    </main>
  );
};

export default CreatorContent;
