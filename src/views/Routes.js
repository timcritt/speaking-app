import React from 'react';
import { Home } from '../views/Home';
import { About } from '../views/About';
import FCEPart2 from '../components/FCEPart2';
import { Route, Switch, Redirect } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/Home' component={Home} />
      <Route exact path='/FCEPart2' component={FCEPart2} />
      <Route exact path='/' component={Home} />
      <Route exact path='/'>
        <Redirect to='/Home' />
      </Route>
      <Route exact path='/About' component={About} />
    </Switch>
  );
};

export default Routes;
