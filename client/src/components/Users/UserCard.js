import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/RequestHeaders';
import UserContext from './UserContext';
import FollowButton from '../FollowButton';
import '../../css/UserCard.css';
import '../../css/App.css';

const UserCard = props => {
  let context = useContext(UserContext);
  const [userState, setUserState] = useState({});
  const [accountExists, setAccountExists] = useState(true);
  const { followers, following, name, jweets, bio } = userState;

  const buttonStyles = {
    canFollow: 'UserCard-Button UserCard-ButtonFollow',
    isFollowing: 'UserCard-Button UserCard-ButtonFollowing'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`/api/users/${props.paramName}`, config);
        let jweets = await axios.get(
          `/api/jweets/user/${props.paramName}`,
          config
        );
        if (response.status === 200) {
          setUserState({ ...response.data, ...jweets.data });
        }
      } catch (err) {
        if (err.response.status === 404) {
          setAccountExists(false);
        }
      }
    };
    fetchData();
  }, [props.paramName, context]);

  return accountExists ? (
    <div className="whiteBox UserCard-Box">
      <div className="UserCard-Heading">
        <Link className="link" to={`/${name}`}>
          <h1 className="Heading">{name}</h1>
        </Link>

        {bio ? <p className="UserCard-Bio">{bio}</p> : null}

        {context.user.name === name ? (
          ''
        ) : (
          <FollowButton buttonStyles={buttonStyles} name={name} />
        )}
      </div>

      <div className="UserCard-StatBox">
        <h3 className="UserCard-StatHeading">
          Followers
          <span className="UserCard-Stat">
            {followers ? followers.length : 0}
          </span>
        </h3>

        <h3 className="UserCard-StatHeading">
          Following
          <span className="UserCard-Stat">
            {following ? following.length : 0}
          </span>
        </h3>

        <h3 className="UserCard-StatHeading">
          Jweets
          <span className="UserCard-Stat">{jweets ? jweets.length : 0}</span>
        </h3>
      </div>
    </div>
  ) : (
    <div className="whiteBox Heading">Account does not exist.</div>
  );
};

export default UserCard;
