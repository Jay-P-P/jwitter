import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FaRegHourglass, FaHourglass } from 'react-icons/fa';
import axios from 'axios';
import UserContext from '../Users/UserContext';
import '../../css/Jweet.css';

const RejweetButton = props => {
  let userContext = useContext(UserContext);
  const { jweetId, rejweets, updateJweet } = props;
  const [clickedWithoutLogin, setClickedWithoutLogin] = useState(false);
  const [isRejweeted, setIsRejweeted] = useState(false);

  useEffect(() => {
    const { _id } = userContext.user;
    if (rejweets) {
      let result = rejweets.filter(rejweet => {
        return rejweet.user._id === _id;
      });
      if (result.length === 1) {
        setIsRejweeted(true);
      } else {
        setIsRejweeted(false);
      }
    }
  }, [userContext.user, rejweets]);

  const rejweetJweet = async () => {
    try {
      let response = await axios.post(`/api/jweets/${jweetId}/rejweet`, null);
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
          <FaHourglass className="Jweet-Rejweeted" />
        ) : (
          <FaRegHourglass />
        )}
      </button>{' '}
      <span className="Jweet-Stat">{rejweets ? rejweets.length : 0}</span>
    </Fragment>
  );
};

export default RejweetButton;
