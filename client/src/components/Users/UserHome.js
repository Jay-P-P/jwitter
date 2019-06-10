import React, { Fragment, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import LoginContext from '../Auth/LoginContext';
import config from '../../config/RequestHeaders';
import UserCard from '../Users/UserCard';
import Home from '../Home';
import JweetsList from '../Jweet/JweetsList';
import '../../css/App.css';
import '../../css/UserHome.css';
import ComposeJweet from '../Jweet/ComposeJweet';

const UserHome = props => {
  let userContext = useContext(UserContext);
  let loginContext = useContext(LoginContext);
  const [jweets, setJweets] = useState([]);

  useEffect(() => {
    const getJweets = async () => {
      let response = await axios.get(`/api/jweets/`, config);
      if (response.status === 200) {
        setJweets(response.data.jweets);
      }
    };
    getJweets();
  }, [userContext]);

  return (
    <div className="container UserHome-Grid">
      {loginContext.isLoggedIn ? (
        <Fragment>
          <UserCard paramName={userContext.user.name} />
          <div className="UserHome-Timeline">
            <ComposeJweet />
            <JweetsList jweets={jweets} />
          </div>
        </Fragment>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default UserHome;
