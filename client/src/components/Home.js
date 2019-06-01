import React, { Fragment, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/Home.css';
import '../css/App.css';
import LoginContext from './Auth/LoginContext';

const Home = props => {
  let context = useContext(LoginContext);
  return (
    <div className="container">
      {!context.isLoggedIn ? (
        <Fragment>
          <Link className="Button Home-RegisterBtn" to="/register">
            Register
          </Link>
          <Link className="Button Home-LoginBtn" to="/login">
            Login
          </Link>
        </Fragment>
      ) : (
        <Redirect to="/home" />
      )}
    </div>
  );
};

export default Home;
