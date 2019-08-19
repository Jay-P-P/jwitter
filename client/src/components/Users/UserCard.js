import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import UserContext from './UserContext';
import FollowButton from '../FollowButton';
import LoadingCircle from '../LoadingCircle';
import '../../css/UserCard.css';
import '../../css/Jweet.css';
import '../../css/App.css';
import Avatar from './Avatar';

const UserCard = props => {
  let context = useContext(UserContext);
  const [userState, setUserState] = useState({});
  const [accountExists, setAccountExists] = useState(true);
  const [userStateLoaded, setUserStateLoaded] = useState(false);
  const [jweetsCount, setJweetsCount] = useState(0);
  const { followers, following, name, bio, avatar } = userState;

  const buttonStyles = {
    canFollow: 'UserCard-Button UserCard-ButtonFollow',
    isFollowing: 'UserCard-Button UserCard-ButtonFollowing'
  };

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      try {
        let response = await axios.get(`/api/users/${props.paramName}`);
        let jweets = await axios.get(`/api/jweets/user/${props.paramName}`);
        let timelineOfJweets = jweets.data.jweets;
        let numOfJweetsByUser = await timelineOfJweets.filter(jweet => {
          return jweet.text;
        });
        setJweetsCount(numOfJweetsByUser.length);
        if (response.status === 200) {
          if (!unmounted) {
            setUserState({ ...response.data });
            setUserStateLoaded(true);
            setAccountExists(true);
          }
        }
      } catch (err) {
        if (err.response.status === 404) {
          setAccountExists(false);
          setUserStateLoaded(true);
        }
      }
    };
    fetchData();

    return () => {
      unmounted = true;
    };
  }, [props.paramName, context]);

  return accountExists ? (
    <>
      <CSSTransition
        in={!userStateLoaded}
        timeout={500}
        classNames="Loading"
        unmountOnExit
      >
        <LoadingCircle />
      </CSSTransition>
      <CSSTransition
        in={accountExists && userStateLoaded}
        timeout={1000}
        classNames="UserCard-Box"
        mountOnEnter
      >
        <span className="UserCard-Box">
          <Avatar className="UserCard-Avatar" url={avatar} />
          <div className="UserCard-Info" />
          <Link className="link UserCard-Name" to={`/${name}`}>
            <h1>{name ? name : null}</h1>
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
          <h3 className="UserCard-StatHeading">
            <div>
              <span className="UserCard-Stat">
                {jweetsCount ? jweetsCount : 0}
              </span>{' '}
              Jweets
            </div>
            <div>
              <span className="UserCard-Stat">
                {followers ? followers.length : 0}
              </span>{' '}
              Followers
            </div>
            <div>
              <span className="UserCard-Stat">
                {following ? following.length : 0}
              </span>{' '}
              Following
            </div>
          </h3>

          {/* <h3 className="UserCard-StatHeading">
            <span className="UserCard-Stat">
              {following ? following.length : 0}
            </span>{' '}
            Following
          </h3>

          <h3 className="UserCard-StatHeading">
            <span className="UserCard-Stat">
              {jweetsCount ? jweetsCount : 0}
            </span>{' '}
            Jweets
          </h3> */}
        </span>
      </CSSTransition>
    </>
  ) : (
    <div className="whiteBox Heading">Account doesn't exist.</div>
  );
};

export default UserCard;
