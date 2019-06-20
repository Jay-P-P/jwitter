import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import Jweet from './Jweet';
import '../../css/Jweet.css';

const LikedJweet = props => {
  const { jweet: likedJweet } = props;
  const [jweet, setJweet] = useState({});

  useEffect(() => {
    const fetchJweet = async () => {
      let response = await axios.get(`/api/jweets/${likedJweet.jweet._id}`);
      if (response.status === 200) {
        setJweet({ ...response.data.jweet });
      }
    };
    fetchJweet();
  }, [likedJweet]);

  return (
    <div>
      <p className="Jweet-Name Jweet-LikedName">
        {likedJweet ? (
          <Link className="link" to={`/${likedJweet.user.name}`}>
            <FaHeart fontStyle="italic" className="Jweet-ItalicSymbol" />{' '}
            {`${likedJweet.user.name} liked.`}
          </Link>
        ) : null}
      </p>
      {Object.keys(jweet).length > 0 ? <Jweet jweet={jweet} /> : null}
    </div>
  );
};

export default LikedJweet;
