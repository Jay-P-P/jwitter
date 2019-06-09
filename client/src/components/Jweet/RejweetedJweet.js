import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/RequestHeaders';
import Jweet from './Jweet';

const RejweetedJweet = props => {
  const { jweet: rejweetedJweet } = props;
  const [jweet, setJweet] = useState({});

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

  return (
    <div className="whiteBox">
      <p className="Jweet-Name Jweet-RejweetedName">
        <Link className="link" to={`/${rejweetedJweet.user.name}`}>
          <i className="fas fa-retweet" />{' '}
          {`${rejweetedJweet.user.name} rejweeted.`}
        </Link>
      </p>
      {Object.keys(jweet).length > 0 ? <Jweet jweet={jweet} /> : null}
    </div>
  );
};

export default RejweetedJweet;
