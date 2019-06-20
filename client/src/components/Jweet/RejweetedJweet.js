import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHourglass } from 'react-icons/fa';
import axios from 'axios';
import Jweet from './Jweet';
import '../../css/Jweet.css';

const RejweetedJweet = props => {
  const { jweet: rejweetedJweet } = props;
  const [jweet, setJweet] = useState({});

  useEffect(() => {
    const fetchJweet = async () => {
      let response = await axios.get(`/api/jweets/${rejweetedJweet.jweet._id}`);
      if (response.status === 200) {
        setJweet({ ...response.data.jweet });
      }
    };
    fetchJweet();
  }, [rejweetedJweet]);

  return (
    <div>
      <p className="Jweet-Name Jweet-RejweetedName">
        <Link className="link" to={`/${rejweetedJweet.user.name}`}>
          <FaHourglass className="Jweet-ItalicSymbol" />{' '}
          {`${rejweetedJweet.user.name} rejweeted.`}
        </Link>
      </p>
      {Object.keys(jweet).length > 0 ? <Jweet jweet={jweet} /> : null}
    </div>
  );
};

export default RejweetedJweet;
