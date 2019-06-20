import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import UserContext from './UserContext';
import FollowButton from '../FollowButton';
import '../../css/UserCard.css';
import '../../css/Jweet.css';
import '../../css/App.css';

const UserCard = props => {
  let context = useContext(UserContext);
  const [userState, setUserState] = useState({});
  const [accountExists, setAccountExists] = useState(true);
  const [userStateLoaded, setUserStateLoaded] = useState(false);
  const [jweetsCount, setJweetsCount] = useState(0);
  const { followers, following, name, bio } = userState;

  const buttonStyles = {
    canFollow: 'UserCard-Button UserCard-ButtonFollow',
    isFollowing: 'UserCard-Button UserCard-ButtonFollowing'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`/api/users/${props.paramName}`);
        let jweets = await axios.get(`/api/jweets/user/${props.paramName}`);
        if (response.status === 200) {
          setUserState({ ...response.data });
        }
        let timelineOfJweets = jweets.data.jweets;
        let numOfJweetsByUser = timelineOfJweets.filter(jweet => {
          return jweet.text;
        });
        setJweetsCount(numOfJweetsByUser.length);
        setUserStateLoaded(true);
      } catch (err) {
        if (err.response.status === 404) {
          setAccountExists(false);
        }
      }
    };
    fetchData();
  }, [props.paramName]);

  return accountExists ? (
    <div className="whiteBox UserCard-Box">
      <CSSTransition
        in={userStateLoaded}
        timeout={1000}
        classNames="UserCard-Heading"
      >
        <div className="UserCard-Heading">
          <Link className="link" to={`/${name}`}>
            <h1 className="Heading">{name ? name : null}</h1>
          </Link>

          {bio ? <p className="UserCard-Bio">{bio ? bio : null}</p> : null}

          {context.user.name === name ? (
            <Link
              className="link UserCard-Button UserCard-Edit"
              to="/user/profile"
            >
              Edit Profile
            </Link>
          ) : (
            <FollowButton buttonStyles={buttonStyles} name={name} />
          )}
        </div>
      </CSSTransition>

      <CSSTransition
        in={userStateLoaded}
        timeout={1000}
        classNames="UserCard-StatBox"
      >
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
            <span className="UserCard-Stat">
              {jweetsCount ? jweetsCount : 0}
            </span>
          </h3>
        </div>
      </CSSTransition>
    </div>
  ) : (
    <CSSTransition timeout={1000} classNames="UserCard-Heading">
      <div className="whiteBox Heading">Account {name} does not exist.</div>
    </CSSTransition>
  );
};

export default UserCard;
