import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { firebaseAuth } from '../../context/AuthProvider';
import Signin from '../Signin/Signin';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { token, emailVerified } = useContext(firebaseAuth);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!token && !!emailVerified ? <RouteComponent {...routeProps} /> : <Signin />
      }
    />
  );
};

export default PrivateRoute;
