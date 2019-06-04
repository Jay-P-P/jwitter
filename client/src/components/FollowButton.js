import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../config/RequestHeaders';
import LoginContext from './Auth/LoginContext';
import UserContext from './Users/UserContext';
import '../css/App.css';
import '../css/UserCard.css';

const FollowButton = props => {
  let userContext = useContext(UserContext);
  let loginContext = useContext(LoginContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const [clickedWithoutLogin, setClickedWithoutLogin] = useState(false);
  const { name, buttonStyles } = props;
  const { canFollow, isFollowing } = buttonStyles;

  useEffect(() => {
    const setButtonText = () => {
      if (userContext.user.following) {
        userContext.user.following
          .filter(user => {
            return user.name === name;
          })
          .map(() => {
            return setIsFollowed(true);
          });
      }
    };
    setButtonText();
  }, [userContext.user.following, name]);

  const toggleFollow = async () => {
    if (loginContext.isLoggedIn) {
      let response = await axios.post(
        `/api/users/${name}/follow`,
        null,
        config
      );
      if (response.status === 200) {
        setIsFollowed(!isFollowed);
        await userContext.updateUser(userContext.user.name);
      }
    } else {
      setClickedWithoutLogin(true);
    }
  };

  return (
    <button
      onClick={() => toggleFollow()}
      className={`Button ${isFollowed ? isFollowing : canFollow}`}
    >
      {clickedWithoutLogin ? <Redirect to="/login" /> : ''}
      {isFollowed ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
