import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './css/App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import UsersList from './components/Users/UsersList';
import LoginContext from './components/Auth/LoginContext';
import config from './config/RequestHeaders';
import UserContext from './components/Users/UserContext';
import UserHome from './components/Users/UserHome';

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
    let response = await axios.get(`/api/users/${name}`, config);
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
        <Switch>
          <LoginContext.Provider value={loginState}>
            <UserContext.Provider value={userContext}>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/home" component={UserHome} />
              <PrivateRoute path="/users" component={UsersList} />
            </UserContext.Provider>
          </LoginContext.Provider>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
