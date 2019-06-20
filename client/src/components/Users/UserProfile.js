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
  const [jweets, setJweets] = useState([]);
  const [statusCode, setStatusCode] = useState(0);
  let userContext = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let response = await axios.get(`/api/jweets/user/${name}`);
        if (response.status === 200) {
          setJweets(response.data.jweets);
          setStatusCode(200);
        }
      } catch (err) {
        if (err.response.status === 404) {
          setStatusCode(404);
        }
      }
    };
    fetchUserData();
  }, [name]);

  return name === userContext.user.name ? (
    <Redirect to="/home" />
  ) : (
    <div className="container UserHome-Grid">
      <UserCard paramName={name} />
      <div className="UserHome-Timeline">
        <CSSTransition timeout={1000} classNames="UserHomeList">
          <JweetsList statusCode={statusCode} jweets={jweets} />
        </CSSTransition>
      </div>
    </div>
  );
};

export default UserProfile;
