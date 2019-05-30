import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../config/RequestHeaders';
import UserContext from './UserContext';
import FollowButton from '../FollowButton';
import '../../css/User.css';
import '../../css/App.css';

const User = props => {
  let context = useContext(UserContext);
  const [userState, setUserState] = useState({});
  const { followers, following, name, jweets, bio } = userState;

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`/api/users/${props.paramName}`, config);
      let jweets = await axios.get(`/api/jweets/${props.paramName}`, config);
      setUserState({ ...response.data, ...jweets.data });
    };
    fetchData();
  }, [props.paramName, context]);

  return (
    <div className="whiteBox User-Box">
      <div className="User-Heading">
        <h1 className="Heading">{name}</h1>
        <p className="User-Bio">{bio}</p>
        {context.user.name === name ? (
          ''
        ) : (
          <FollowButton buttonStyle="User-Button" name={name} />
        )}
      </div>
      <div className="User-StatBox">
        <h3 className="User-StatHeading">
          Followers
          <span className="User-Stat">{followers ? followers.length : 0}</span>
        </h3>
        <h3 className="User-StatHeading">
          Following
          <span className="User-Stat">{following ? following.length : 0}</span>
        </h3>
        <h3 className="User-StatHeading">
          Jweets
          <span className="User-Stat">{jweets ? jweets.length : 0}</span>
        </h3>
      </div>
    </div>
  );
};

export default User;
