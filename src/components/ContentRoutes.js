import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import MyTests from './MyTests';
import MyFolders from './MyFolders';
import { firebaseAuth } from '../context/AuthProvider';
import FolderSummary from './FolderSummary';

const ContentRoutes = ({ url }) => {
  const { userId } = useContext(firebaseAuth);

  return (
    <Switch>
      <Route exact path={`${url}/`}>
        <MyTests />
      </Route>
      <Route path={`${url}/folders`}>
        <MyFolders FolderList={FolderSummary} />
      </Route>
    </Switch>
  );
};

export default ContentRoutes;
