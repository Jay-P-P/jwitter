import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Landing from './Landing';
import '../css/Home.css';
import '../css/App.css';
import LoginContext from './Auth/LoginContext';

const Home = props => {
  let context = useContext(LoginContext);
  return (
    <div>{!context.isLoggedIn ? <Landing /> : <Redirect to="/home" />}</div>
  );
};

export default Home;
