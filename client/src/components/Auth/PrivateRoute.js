import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginContext from '../Auth/LoginContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={props =>
        context.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
