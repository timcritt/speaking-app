import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import MyTests from './MyTests';
import AllFolders from './AllFolders';
import MyFolders from './MyFolders';
import { firebaseAuth } from '../context/AuthProvider';
import FolderSummary from './FolderSummary';

const ContentRoutes = ({ url, creatorId }) => {
  return (
    <Switch>
      <Route exact path={`${url}/folders`}>
        <MyFolders
          FolderList={FolderSummary}
          creatorId={creatorId ? creatorId : ''}
        />
      </Route>
      <Route exact path={`${url}/tests`}>
        <MyTests creatorId={creatorId ? creatorId : ''} />
      </Route>
    </Switch>
  );
};

export default ContentRoutes;
