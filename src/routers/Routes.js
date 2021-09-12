import React, { Fragment } from 'react';
import Home from 'components/Home/Home';
import { About } from 'components/About/About';
import FCEPart2View from 'components/FCEPart2/FCEPart2View';
import EditFCEPart2 from 'components/FCEPart2/EditFCEPart2';
import CreatorContent from 'components/CreatorContent/CreatorContent';
import { Route, Switch } from 'react-router-dom';
import Signup from 'components/Signup';
import Signin from 'components/Signin';
import PrivateRoute from 'components/common/PrivateRoute';
import ViewFolder from 'components/ViewFolder/ViewFolder';
import ExploreContent from 'components/ExploreContent/ExploreContent';
import Profile from 'components/Profile/Profile';
import FCEPart3View from 'components/FCEPart3/FCEPart3View';
import EditFCEPart3 from 'components/FCEPart3/EditFCEPart3';
import CAEPart3View from 'components/CAEPart3/CAEPart3View';
import EditCAEPart3 from 'components/CAEPart3/EditCAEPart3';
import CreateView from 'components/Create/CreateView';
import { FCEPart2ContextProvider } from 'context/FCEPart2Context';
import { FCEPart3ContextProvider } from 'context/FCEPart3Context';
import { CAEPart2ContextProvider } from 'context/CAEPart2Context';
import { CAEPart3ContextProvider } from 'context/CAEPart3Context';
import CAEPart2View from 'components/CAEPart2/CAEPart2View';
import EditCAEPart2 from 'components/CAEPart2/EditCAEPart2';
import ImageSearch from 'components/common/ImageSearch';

const Routes = () => {
  return (
    <Fragment>
      <FCEPart2ContextProvider>
        <FCEPart3ContextProvider>
          <CAEPart2ContextProvider>
            <CAEPart3ContextProvider>
              <Switch>
                <Route exact path='/home' component={Home} />
                <PrivateRoute exact path='/create' component={CreateView} />
                <Route exact path='/' component={Home} />
                <Route exact path='/signin' component={Signin} />
                <Route exact path='/signup' component={Signup} />

                {/*FCE*/}
                <PrivateRoute exact path='/EditFCEPart2/:id' component={EditFCEPart2} />
                <Route exact path='/FCEPart2/:id' component={FCEPart2View} />
                <Route exact path='/FCEPart3/:id' component={FCEPart3View} />
                <Route exact path='/EditFCEPart3/:id' component={EditFCEPart3} />

                {/*CAE*/}
                <Route exact path='/CAEPart2/:id' component={CAEPart2View} />
                <Route exact path='/EditCAEPart2/:id' component={EditCAEPart2} />
                <Route exact path='/CAEPart3/:id' component={CAEPart3View} />
                <PrivateRoute exact path='/EditCAEPart3/:id' component={EditCAEPart3} />

                {/*test components*/}
                <Route exact path='/ImageSearch/' component={ImageSearch} />

                <PrivateRoute path='/userContent/:userId' component={CreatorContent} />
                <Route exact path='/about' component={About} />
                <Route path='/exploreContent/' component={ExploreContent} />
                <Route exact path='/folder/:folderId' component={ViewFolder} />
                <PrivateRoute exact path='/profile/:userId' component={Profile} />
              </Switch>
            </CAEPart3ContextProvider>
          </CAEPart2ContextProvider>
        </FCEPart3ContextProvider>
      </FCEPart2ContextProvider>
    </Fragment>
  );
};

export default Routes;
