import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/RequestHeaders';
import JweetTime from './JweetTime';
import LikeJweetButton from './LikeJweetButton';
import RejweetButton from './RejweetButton';

const RejweetedJweet = props => {
  const { jweet: rejweetedJweet } = props;
  const [jweet, setJweet] = useState({});
  const { user, text, date, likes, rejweets, _id } = jweet;

  useEffect(() => {
    const fetchJweet = async () => {
      let response = await axios.get(
        `/api/jweets/${rejweetedJweet.jweet._id}`,
        config
      );
      if (response.status === 200) {
        setJweet({ ...response.data.jweet });
      }
    };
    fetchJweet();
  }, [rejweetedJweet]);

  const updateJweet = async data => {
    setJweet({ ...jweet, ...data });
  };

  return (
    <div className="whiteBox Jweet-List">
      <p className="Jweet-Name Jweet-RejweetedName">
        <Link className="link" to={`/${rejweetedJweet.user.name}`}>
          <i className="fas fa-retweet" />{' '}
          {`${rejweetedJweet.user.name} rejweeted.`}
        </Link>
      </p>
      <div className="Jweet-RejweetedJweet">
        <div className="Jweet-User">
          <p className="Jweet-Name">
            {user ? (
              <Link className="link" to={`/${user.name}`}>
                {`${user.name}`}
              </Link>
            ) : null}
          </p>
          {date ? <JweetTime date={date} /> : ''}
        </div>
        <div className="Jweet-TextBox">
          <p className="Jweet-Text">{text}</p>
        </div>
        <div className="Jweet-StatBox">
          <h3 className="Jweet-StatHeading">
            {likes ? (
              <LikeJweetButton
                likes={likes}
                updateJweet={updateJweet}
                jweetId={_id}
              />
            ) : null}
          </h3>
          <h3 className="Jweet-StatHeading">
            {rejweets ? (
              <RejweetButton
                rejweets={rejweets}
                updateJweet={updateJweet}
                jweetId={_id}
              />
            ) : null}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RejweetedJweet;
