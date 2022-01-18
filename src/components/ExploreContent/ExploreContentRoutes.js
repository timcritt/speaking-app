import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AllTests from './AllTests';
import AllFolders from './AllFolders';
import FolderSummary from '../common/FolderSummary';
import SearchUsers from './Users/SearchUsers';

const ExploreContentRoutes = ({ url, creatorId }) => {
  return (
    <Switch>
      <Route exact path={`${url}/folders`}>
        <AllFolders FolderList={FolderSummary} />
      </Route>
      <Route exact path={`${url}/tests`}>
        <AllTests creatorId={creatorId ? creatorId : ''} />
      </Route>
      <Route exact path={`${url}/users`}>
        <SearchUsers creatorId={creatorId ? creatorId : ''} />
      </Route>
    </Switch>
  );
};

export default ExploreContentRoutes;
