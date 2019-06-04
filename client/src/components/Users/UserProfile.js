import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/RequestHeaders';
import UserCard from './UserCard';
import JweetsList from '../Jweet/JweetsList';
import '../../css/App.css';
import '../../css/UserHome.css';
import UserContext from './UserContext';

const UserProfile = props => {
  const { name } = props.match.params;
  const [jweets, setJweets] = useState([]);
  let userContext = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      let response = await axios.get(`/api/jweets/user/${name}`, config);
      if (response.status === 200) {
        setJweets(response.data.jweets);
      }
    };
    fetchUserData();
  }, [name]);

  return name === userContext.user.name ? (
    <Redirect to="/home" />
  ) : (
    <div className="container UserHome-Grid">
      <UserCard paramName={name} />
      <JweetsList jweets={jweets} />
    </div>
  );
};

export default UserProfile;
