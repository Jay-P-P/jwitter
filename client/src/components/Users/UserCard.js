import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import UserContext from './UserContext';
import FollowButton from '../FollowButton';
import '../../css/UserCard.css';
import '../../css/Jweet.css';
import '../../css/App.css';
import Avatar from './Avatar';

const UserCard = props => {
  let context = useContext(UserContext);
  const [accountExists, setAccountExists] = useState(false);
  const [userStateLoaded, setUserStateLoaded] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [jweetsCount, setJweetsCount] = useState(0);
  const { followers, following, name, bio, avatar } = props.user;

  const buttonStyles = {
    canFollow: 'UserCard-Button UserCard-ButtonFollow',
    isFollowing: 'UserCard-Button UserCard-ButtonFollowing'
  };

  useEffect(() => {
    if (props.user) {
      setUserStateLoaded(true);
      Object.keys(props.user).length
        ? setAccountExists(true)
        : setAccountExists(false);
      if (props.user.jweets) {
        setJweetsCount(props.user.jweets.length);
      }
      if (props.user.userNotFound) {
        setUserNotFound(true);
      }
    }
  }, [props.user]);

  return (
    <>
      <CSSTransition
        in={accountExists && userStateLoaded && !userNotFound}
        timeout={1000}
        classNames="UserCard-Box"
        mountOnEnter
      >
        <div className="UserCard-Box">
          <Avatar
            className="UserCard-Avatar"
            url={avatar}
            alt={`${name}'s profile picture.`}
          />
          <div className="UserCard-Info" />
          <Link className="link UserCard-Name" to={`/${name}`}>
            <h1 title={name ? name : null}>{name ? name : null}</h1>
          </Link>
          {bio ? <p className="UserCard-Bio">{bio ? bio : null}</p> : null}

          {context.user.name === name ? (
            <Link
              className="link UserCard-Button UserCard-Edit"
              to="/user/profile"
            >
              Edit
            </Link>
          ) : (
            <FollowButton buttonStyles={buttonStyles} name={name} />
          )}
          <h3 className="UserCard-StatHeading">
            {props.user.jweets ? (
              <div>
                <span className="UserCard-Stat">
                  {jweetsCount ? jweetsCount : 0}
                </span>{' '}
                Jweets
              </div>
            ) : null}
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
        </div>
      </CSSTransition>
      <CSSTransition
        in={userNotFound && userStateLoaded && accountExists}
        timeout={1000}
        classNames="UserCard-Box"
        mountOnEnter
      >
        <div className="whiteBox Heading UserCard-404">
          Account doesn't exist.
        </div>
      </CSSTransition>
    </>
  );
};

export default UserCard;
