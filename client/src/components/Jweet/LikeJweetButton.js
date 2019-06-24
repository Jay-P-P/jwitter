import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import UserContext from '../Users/UserContext';
import '../../css/Jweet.css';

const LikeJweetButton = props => {
  let userContext = useContext(UserContext);
  const { jweetId, likes, updateJweet } = props;
  const [clickedWithoutLogin, setClickedWithoutLogin] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const { _id } = userContext.user;
    if (likes) {
      let result = likes.filter(like => {
        return like.user._id === _id;
      });
      if (result.length === 1) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [userContext.user, likes]);

  const likeJweet = async () => {
    try {
      let response = await axios.post(`/api/jweets/${jweetId}/like`, null);
      if (response.status === 200) {
        setIsLiked(!isLiked);
        updateJweet(response.data);
      }
    } catch (err) {
      if (err.response.status === 401) {
        setClickedWithoutLogin(true);
      }
    }
  };

  return (
    <Fragment>
      {clickedWithoutLogin ? <Redirect to="/login" /> : null}
      <button onClick={() => likeJweet()} className="Jweet-Button">
        {isLiked ? <FaHeart className="Jweet-Liked" /> : <FaRegHeart />}
      </button>{' '}
      <span className="Jweet-Stat">{likes ? likes.length : 0}</span>
    </Fragment>
  );
};

export default LikeJweetButton;
