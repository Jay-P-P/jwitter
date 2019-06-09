import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/RequestHeaders';
import Jweet from './Jweet';

const LikedJweet = props => {
  const { jweet: likedJweet } = props;
  const [jweet, setJweet] = useState({});

  useEffect(() => {
    const fetchJweet = async () => {
      let response = await axios.get(
        `/api/jweets/${likedJweet.jweet._id}`,
        config
      );
      if (response.status === 200) {
        setJweet({ ...response.data.jweet });
      }
    };
    fetchJweet();
  }, [likedJweet]);

  return (
    <div className="whiteBox">
      <p className="Jweet-Name Jweet-LikedName">
        {likedJweet ? (
          <Link className="link" to={`/${likedJweet.user.name}`}>
            <i className="fas fa-heart" /> {`${likedJweet.user.name} liked.`}
          </Link>
        ) : null}
      </p>
      {Object.keys(jweet).length > 0 ? <Jweet jweet={jweet} /> : null}
    </div>
  );
};

export default LikedJweet;
