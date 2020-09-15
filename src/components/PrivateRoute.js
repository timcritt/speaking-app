import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { firebaseAuth } from '../context/AuthProvider';
import Signin from './Signin';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { token } = useContext(firebaseAuth);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!token ? <RouteComponent {...routeProps} /> : <Signin />
      }
    />
  );
};

export default PrivateRoute;
