import React, { useContext, useState, useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import { FCEPart2 } from '../firebase/firebaseConsts';
import profilePic from '../img/my-profile-pic.jpg';
import { firebaseAuth } from '../context/AuthProvider';
import { useParams, useRouteMatch } from 'react-router-dom';
import ContentRoutes from '../components/ContentRoutes';
import DashBoardButton from '../components/DashBoardButton';
import getUserDetails from '../APIHandlers/getUserDetails';

const CreatorContent = () => {
  const creatorId = useParams().userId;
  const [creatorDetails, setCreatorDetails] = useState(null);

  useEffect(() => {
    (async () => {
      const details = await getUserDetails(creatorId);
      setCreatorDetails(details);
    })();
  }, [creatorId]);

  let { path, url } = useRouteMatch();
  return (
    <main className='holy-grail-content fade-in'>
      <div className='my-content-content'>
        <div className='dashboard-container'>
          <div className='dashboard-profile-pic-container'>
            <img className='dashboard-image' src={profilePic}></img>
          </div>
          <div className='dashboard-main'>
            <div className='dashboard-user-info'>
              <span className='dashboard-user-name'>
                {creatorDetails && creatorDetails.userName}
              </span>
            </div>
            <div className='dashboard-button-bar'>
              <DashBoardButton linkTo={url} label={'Created'} checked={true} />
              <DashBoardButton linkTo={`${url}/folders`} label={'Folders'} />
            </div>
          </div>
        </div>
        {/* router goes here */}
        <div className='my-content-main'>
          <ContentRoutes url={url} creatorId={creatorId} />
        </div>
      </div>
    </main>
  );
};

export default CreatorContent;
