import React from 'react';
import DashBoardButton from '../common/DashBoardButton';
import { useRouteMatch } from 'react-router-dom';
import ExploreContentRoutes from './ExploreContentRoutes';

const ExploreContent = () => {
  let { url } = useRouteMatch();
  return (
    <main className='holy-grail-content fade-in'>
      <div className='my-content-content'>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='dashboard-container'>
            <div className='dashboard-main'>
              <div className='dashboard-user-info'>
                <span className='content-title'>Explore Content</span>
              </div>
            </div>
          </div>

          {/* router goes here */}
          <div className='my-content-main'>
            <div className='dashboard-button-bar-sm'>
              <DashBoardButton linkTo={`${url}/tests`} label={'Tests'} />
              {/*<DashBoardButton linkTo={`${url}/folders`} label={'Folders'} /> */}
              <DashBoardButton linkTo={`${url}/users`} label={'Users'} />
            </div>
            <ExploreContentRoutes url={url} creatorId={''} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExploreContent;
