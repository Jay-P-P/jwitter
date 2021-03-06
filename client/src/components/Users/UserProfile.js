import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import UserCard from './UserCard';
import JweetsList from '../Jweet/JweetsList';
import '../../css/App.css';
import '../../css/UserHome.css';
import UserContext from './UserContext';

const UserProfile = props => {
  const { name } = props.match.params;
  const [userState, setUserState] = useState({});
  const [jweets, setJweets] = useState([]);
  const [jweetsLoaded, setJweetsLoaded] = useState(false);
  let userContext = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (name === userContext.user.name) {
          return;
        }
        let response = await axios.get(`/api/jweets/user/${name}`);
        let user = await axios.get(`/api/users/${name}`);
        if (response.status === 200) {
          setJweetsLoaded(true);
          setJweets(response.data.jweets);
        }
        if (user.status === 200) {
          setUserState({ ...user.data });
        }
      } catch (err) {
        if (err.response.status === 404) {
          setJweetsLoaded(true);
          setUserState({ userNotFound: true });
        }
      }
    };
    fetchUserData();
  }, [name, userContext.user.name]);

  return name === userContext.user.name ? (
    <Redirect to="/home" />
  ) : (
    <div className="container UserHome-Grid">
      <UserCard user={userState} />
      <div className="UserHome-Timeline">
        <CSSTransition timeout={1000} classNames="UserHomeList">
          <JweetsList jweetsLoaded={jweetsLoaded} jweets={jweets} />
        </CSSTransition>
      </div>
    </div>
  );
};

export default UserProfile;
