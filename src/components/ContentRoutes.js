import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import MyTests from './MyTests';
import MyFolders from './MyFolders';

const ContentRoutes = ({ url }) => {
  return (
    <Switch>
      <Route exact path={`${url}/`}>
        <MyTests />
      </Route>
      <Route path={`${url}/folders`}>
        <MyFolders />
      </Route>
    </Switch>
  );
};

export default ContentRoutes;
