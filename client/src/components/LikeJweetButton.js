import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../config/RequestHeaders';
import UserContext from './Users/UserContext';
import '../css/Jweet.css';

const LikeJweetButton = props => {
  let userContext = useContext(UserContext);
  const { jweetId, likes, updateJweet } = props;
  const [clickedWithoutLogin, setClickedWithoutLogin] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const { id } = userContext.user;
    let result = likes.filter(user => {
      return user.id === id;
    });
    if (result.length === 1) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [userContext.user, likes]);

  const likeJweet = async () => {
    try {
      let response = await axios.post(
        `/api/jweets/${jweetId}/like`,
        null,
        config
      );
      if (response.status === 200) {
        setIsLiked(!isLiked);
        updateJweet(response.data);
      }
    } catch (err) {
      switch (err.response.status) {
        case 401:
          setClickedWithoutLogin(true);
          break;
        default:
      }
    }
  };

  return (
    <Fragment>
      {clickedWithoutLogin ? <Redirect to="/login" /> : null}
      <button onClick={() => likeJweet()} className="Jweet-Button">
        {isLiked ? (
          <i className="fas fa-heart" />
        ) : (
          <i className="far fa-heart" />
        )}
      </button>{' '}
      <span className="Jweet-Stat">{likes.length}</span>
    </Fragment>
  );
};

export default LikeJweetButton;
