import React from 'react';
import DashBoardButton from '../common/DashBoardButton';
import { useRouteMatch } from 'react-router-dom';
import ExploreContentRoutes from './ExploreContentRoutes';

const ExploreContent = () => {
  let { url } = useRouteMatch();
  return (
    <main className='holy-grail-content'>
      <div className='my-content-content'>
        <div className='dashboard-background-full-width'>
          <div className='dashboard-container'>
            <div className='dashboard-user-info-container'>
              <div className='dashboard-profile-pic-container'>
                <span className='content-title'>Explore Content</span>
              </div>
            </div>

            {/* router goes here */}

            <div className='dashboard-button-bar-sm'>
              <DashBoardButton linkTo={`${url}/tests`} label={'Tests'} />
              {/*<DashBoardButton linkTo={`${url}/folders`} label={'Folders'} /> */}
              <DashBoardButton linkTo={`${url}/users`} label={'Users'} />
            </div>
          </div>
        </div>
        <div className='my-content-main'>
          <ExploreContentRoutes url={url} creatorId={''} />
        </div>
      </div>
    </main>
  );
};

export default ExploreContent;
