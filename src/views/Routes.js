import React, { Fragment, useContext } from 'react';
import Home from '../components/Home';
import { About } from '../views/About';
import FCEPart2 from '../components/FCEPart2';
import EditFCEPart2 from '../components/EditFCEPart2';
import { Route, Switch, Redirect } from 'react-router-dom';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import { firebaseAuth } from '../context/AuthProvider';
import Tests from '../components/Tests';

const Routes = () => {
  const { token } = useContext(firebaseAuth);

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path='/'
          render={(rProps) => (token === null ? <Signin /> : <Home />)}
        />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route
          path='/EditFCEPart2/:id'
          render={(rProps) =>
            token === null ? <Signin /> : <EditFCEPart2 {...rProps} />
          }
        />
        <Route exact path='/FCEPart2/:id' component={FCEPart2} />
        <Route exact path='/' component={About} />
        <Route exact path='/tests' component={Tests} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
