import React from 'react';
import MyTests from './MyTests';
import AllFolders from './AllFolders';
import DashBoardButton from './DashBoardButton';
import { useRouteMatch } from 'react-router-dom';

const ExploreContent = () => {
  let { path, url } = useRouteMatch();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='dashboard-container'>
        <div className='dashboard-profile-pic-container'></div>
        <div className='dashboard-main'>
          <div className='dashboard-user-info'>
            <span className='dashboard-user-name'>some text</span>
          </div>
          <div className='dashboard-button-bar'>
            <DashBoardButton linkTo={url} label={'Created'} checked={true} />
            <DashBoardButton linkTo={`${url}/folders`} label={'Folders'} />
          </div>
        </div>
      </div>
      <MyTests />
      <AllFolders />
    </div>
  );
};

export default ExploreContent;
