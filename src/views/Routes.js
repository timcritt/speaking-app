import React, { Fragment, useContext } from 'react';
import Home from '../components/Home';
import { About } from '../views/About';
import FCEPart2 from '../components/FCEPart2';
import EditFCEPart2 from '../components/EditFCEPart2';
import MyContent from '../views/MyContent';
import { Route, Switch, Redirect } from 'react-router-dom';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import { firebaseAuth } from '../context/AuthProvider';
import Tests from '../components/Tests';
import PrivateRoute from '../components/PrivateRoute';
import ViewFolder from '../components/ViewFolder';

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
        <PrivateRoute path='/mycontent' component={MyContent} />
        <Route exact path='/FCEPart2/:id' component={FCEPart2} />
        <Route exact path='/about' component={About} />
        <Route exact path='/tests' component={Tests} />
        <Route exact path='/folder/:folderId' component={ViewFolder} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
