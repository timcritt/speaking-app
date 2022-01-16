import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { firebaseAuth } from '../../context/AuthProvider';
import Signin from '../Signin';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { token, emailVerified } = useContext(firebaseAuth);
  console.log('privateroute value of emailVerified:', emailVerified);
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
