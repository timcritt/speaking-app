import React, { useContext } from 'react';
import useFirestore from '../hooks/useFirestore';
import { FCEPart2 } from '../firebase/firebaseConsts';
import profilePic from '../img/my-profile-pic.jpg';
import { firebaseAuth } from '../context/AuthProvider';
import Tests from '../components/Tests';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import ContentRoutes from '../components/ContentRoutes';
import DashBoardButton from '../components/DashBoardButton';

const MyContent = () => {
  const docs = useFirestore(FCEPart2);
  const { userId, userEmail } = useContext(firebaseAuth);
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
              <span className='dashboard-user-name'>{userEmail}</span>
            </div>
            <div className='dashboard-button-bar'>
              <DashBoardButton linkTo={url} label={'Created'} checked={true} />
              <DashBoardButton linkTo={`${url}/folders`} label={'Folders'} />
            </div>
          </div>
        </div>
        {/* router goes here */}
        <div className='my-content-main'>
          <ContentRoutes url={url} />
        </div>
      </div>
    </main>
  );
};

export default MyContent;
