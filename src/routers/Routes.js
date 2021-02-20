import React, { Fragment, useContext } from 'react';
import Home from 'components/Home/Home';
import { About } from 'components/About/About';
import FCEPart2 from 'components/FCEPart2/FCEPart2';
import EditFCEPart2 from 'components/FCEPart2/EditFCEPart2';
import CreatorContent from 'components/CreatorContent/CreatorContent';
import { Route, Switch } from 'react-router-dom';
import Signup from 'components/Signup';
import Signin from 'components/Signin';
import PrivateRoute from 'components/common/PrivateRoute';
import ViewFolder from 'components/ViewFolder/ViewFolder';
import ExploreContent from 'components/ExploreContent/ExploreContent';
import Profile from 'components/Profile/Profile';
import Part3 from 'components/FCEPart3/Part3';
import EditPart3 from 'components/FCEPart3/EditPart3';
import CreateView from 'components/Create/CreateView';
import { FCEPart2ContextProvider } from 'context/FCEPart2Context';
import { FCEPart3ContextProvider } from 'context/FCEPart3Context';

const Routes = () => {
  return (
    <Fragment>
      <FCEPart2ContextProvider>
        <FCEPart3ContextProvider>
          <Switch>
            <Route exact path='/home' component={Home} />
            <PrivateRoute exact path='/create' component={CreateView} />
            <Route exact path='/' component={Home} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute
              exact
              path='/EditFCEPart2/:id'
              component={EditFCEPart2}
            />
            <Route exact path='/FCEPart2/:id' component={FCEPart2} />
            <PrivateRoute
              path='/userContent/:userId'
              component={CreatorContent}
            />
            <Route exact path='/FCEPart3/:id' component={Part3} />
            <Route exact path='/EditFCEPart3/:id' component={EditPart3} />
            <Route exact path='/about' component={About} />
            <Route path='/exploreContent/' component={ExploreContent} />
            <Route exact path='/folder/:folderId' component={ViewFolder} />
            <PrivateRoute exact path='/profile/:userId' component={Profile} />
          </Switch>
        </FCEPart3ContextProvider>
      </FCEPart2ContextProvider>
    </Fragment>
  );
};

export default Routes;
