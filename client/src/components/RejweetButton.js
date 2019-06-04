import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../config/RequestHeaders';
import UserContext from './Users/UserContext';
import '../css/Jweet.css';

const RejweetButton = props => {
  let userContext = useContext(UserContext);
  const { jweetId, rejweets, updateJweet } = props;
  const [clickedWithoutLogin, setClickedWithoutLogin] = useState(false);
  const [isRejweeted, setIsRejweeted] = useState(false);

  useEffect(() => {
    const { id } = userContext.user;
    let result = rejweets.filter(user => {
      return user.id === id;
    });
    if (result.length === 1) {
      setIsRejweeted(true);
    } else {
      setIsRejweeted(false);
    }
  }, [userContext.user, rejweets]);

  const rejweetJweet = async () => {
    try {
      let response = await axios.post(
        `/api/jweets/${jweetId}/rejweet`,
        null,
        config
      );
      if (response.status === 200) {
        setIsRejweeted(!isRejweeted);
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
      <button onClick={() => rejweetJweet()} className="Jweet-Button">
        {isRejweeted ? (
          <i className="fas fa-retweet" />
        ) : (
          <i className="fas fa-retweet" />
        )}
      </button>{' '}
      <span className="Jweet-Stat">{rejweets.length}</span>
    </Fragment>
  );
};

export default RejweetButton;
