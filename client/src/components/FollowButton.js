import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import config from '../config/RequestHeaders';
import UserContext from './Users/UserContext';
import '../css/App.css';
import '../css/UserCard.css';

const FollowButton = props => {
  let context = useContext(UserContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const { name, buttonStyles } = props;
  const { canFollow, isFollowing } = buttonStyles;

  useEffect(() => {
    const setButtonText = () => {
      context.user.following
        .filter(user => {
          return user.name === name;
        })
        .map(() => {
          return setIsFollowed(true);
        });
    };
    setButtonText();
  }, [context, name]);

  const toggleFollow = async () => {
    let response = await axios.post(`/api/users/${name}/follow`, null, config);
    if (response.status === 200) {
      setIsFollowed(!isFollowed);
      await context.updateUser(context.user.name);
    }
  };

  return (
    <button
      onClick={() => toggleFollow()}
      className={`Button ${isFollowed ? isFollowing : canFollow}`}
    >
      {isFollowed ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
