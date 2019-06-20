import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';

import './css/App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import UsersList from './components/Users/UsersList';
import LoginContext from './components/Auth/LoginContext';
import UserContext from './components/Users/UserContext';
import UserHome from './components/Users/UserHome';
import UserProfile from './components/Users/UserProfile';
import UserEditProfile from './components/Users/UserEditProfile';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
  const loginUser = () => {
    loginState.isLoggedIn
      ? setLoginState({ ...loginState, isLoggedIn: false })
      : setLoginState({ ...loginState, isLoggedIn: true });
  };
  const [loginState, setLoginState] = useState({
    isLoggedIn: false,
    loginUser
  });
  const updateUser = async name => {
    let response = await axios.get(`/api/users/${name}`);
    setUserContext({ ...userContext, user: { ...response.data } });
  };
  const [userContext, setUserContext] = useState({
    user: {},
    updateUser
  });

  return (
    <Router>
      <Fragment>
        <NavBar />
        <LoginContext.Provider value={loginState}>
          <UserContext.Provider value={userContext}>
            <Route
              render={({ location, match }) => (
                <TransitionGroup>
                  <CSSTransition
                    in={match != null}
                    key={location.key}
                    timeout={{
                      enter: 500,
                      active: 500,
                      done: 100
                    }}
                    classNames="page"
                  >
                    <div className="page">
                      <Switch key={location.key} location={location}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute path="/home" exact component={UserHome} />
                        <PrivateRoute
                          path="/user/profile"
                          exact
                          component={UserEditProfile}
                        />
                        <Route path="/users" exact component={UsersList} />
                        <Route path="/:name" exact component={UserProfile} />
                      </Switch>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          </UserContext.Provider>
        </LoginContext.Provider>
      </Fragment>
    </Router>
  );
}

export default App;
