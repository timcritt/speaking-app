import React, { Fragment, useContext } from 'react';
import Home from '../components/Home';
import { About } from '../views/About';
import FCEPart2 from '../components/FCEPart2';
import EditFCEPart2 from '../components/EditFCEPart2';
import CreatorContent from './CreatorContent';
import { Route, Switch, Redirect } from 'react-router-dom';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import { firebaseAuth } from '../context/AuthProvider';
import Tests from '../components/Tests';
import PrivateRoute from '../components/PrivateRoute';
import ViewFolder from '../components/ViewFolder';
import ExploreContent from '../components/ExploreContent';
import Profile from '../components/Profile';
import Part3 from '../components/Part3';
import EditPart3 from '../components/EditPart3';
const Routes = () => {
  const { token } = useContext(firebaseAuth);

  return (
    <Fragment>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/EditFCEPart2/:id' component={EditFCEPart2} />
        <PrivateRoute path='/userContent/:userId' component={CreatorContent} />
        <Route exact path='/FCEPart2/:id' component={FCEPart2} />
        <Route exact path='/FCEPart3/:id' component={Part3} />
        <Route exact path='/EditFCEPart3/:id' component={EditPart3} />
        <Route exact path='/about' component={About} />
        <Route path='/exploreContent/' component={ExploreContent} />
        <Route exact path='/folder/:folderId' component={ViewFolder} />
        <PrivateRoute exact path='/profile/:userId' component={Profile} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
