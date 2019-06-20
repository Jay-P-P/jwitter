import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import LoginContext from '../Auth/LoginContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={props =>
        context.isLoggedIn ? (
          <CSSTransition
            in={props.match != null}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            <div className="page">
              <Component {...props} />
            </div>
          </CSSTransition>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
