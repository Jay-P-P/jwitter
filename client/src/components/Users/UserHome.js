import React, { Fragment, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import UserContext from './UserContext';
import LoginContext from '../Auth/LoginContext';
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
  const [jweetsLoaded, setJweetsLoaded] = useState(false);

  useEffect(() => {
    const getJweets = async () => {
      try {
        let response = await axios.get(`/api/jweets/`);
        if (response.status === 200) {
          setJweets(response.data.jweets);
          setJweetsLoaded(true);
        }
      } catch (err) {
        if (err.response.status === 404) {
          setJweetsLoaded(true);
        }
      }
    };
    getJweets();
    return () => {};
  }, [userContext]);

  const updateJweets = () => {
    console.log('Updating jweets');
    setJweets([]);
  };

  return (
    <div className="container UserHome-Grid">
      {loginContext.isLoggedIn ? (
        <Fragment>
          <UserCard paramName={userContext.user.name} />
          <div className="UserHome-Timeline">
            <ComposeJweet onPostJweet={updateJweets} />
            <CSSTransition timeout={1000} classNames="UserHomeList">
              <JweetsList jweetsLoaded={jweetsLoaded} jweets={jweets} />
            </CSSTransition>
          </div>
        </Fragment>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default UserHome;
