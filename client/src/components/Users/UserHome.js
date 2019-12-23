import React, { Fragment, useEffect, useState, useContext } from 'react';
import axios from 'axios';
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
    let unmounted = false;
    const getJweets = async () => {
      try {
        if (jweets.length > 0) {
          return;
        }
        let response = await axios.get(`/api/jweets/`);
        if (response.status === 200) {
          if (!unmounted) {
            setJweets(response.data.jweets);
            setJweetsLoaded(true);
          }
        }
      } catch (err) {
        if (err && err.response && err.response.status === 404) {
          setJweetsLoaded(true);
        }
      }
    };
    getJweets();
    return () => {
      unmounted = true;
    };
  }, [jweets.length, userContext]);

  const updateJweets = newJweet => {
    setJweets([newJweet.jweet, ...jweets]);
    userContext.updateUser(userContext.user.name);
  };

  const removeJweet = id => {
    let index = jweets.findIndex(jweet => {
      return jweet._id === id;
    });
    setJweetsLoaded(false);
    setJweets(state => [
      ...state.slice(0, index),
      ...state.slice(index + 1, state.length)
    ]);
    setJweetsLoaded(true);
    userContext.updateUser(userContext.user.name);
  };

  return (
    <div className="container UserHome-Grid">
      {loginContext.isLoggedIn ? (
        <Fragment>
          <UserCard user={userContext.user} />
          <div className="UserHome-Timeline">
            <ComposeJweet onPostJweet={updateJweets} />
            <JweetsList
              onDeleteJweet={removeJweet}
              jweetsLoaded={jweetsLoaded}
              jweets={jweets}
            />
          </div>
        </Fragment>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default UserHome;
