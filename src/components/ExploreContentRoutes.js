import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import AllTests from './AllTests';
import AllFolders from './AllFolders';
import { firebaseAuth } from '../context/AuthProvider';
import FolderSummary from './FolderSummary';
import SearchUsers from './SearchUsers';

const ExploreContentRoutes = ({ url, creatorId }) => {
  const { userId } = useContext(firebaseAuth);

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
