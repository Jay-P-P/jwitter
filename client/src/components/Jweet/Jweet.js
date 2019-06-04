import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import prettyTime from 'pretty-ms';
import LikeJweetButton from '../LikeJweetButton';
import '../../css/App.css';
import '../../css/Jweet.css';
import RejweetButton from '../RejweetButton';

const Jweet = props => {
  const [jweet, setJweet] = useState({ ...props.jweet });
  const [jweetTime, setJweetTime] = useState(0);
  const { user, text, date, likes, rejweets, _id } = jweet;
  const { name } = user;

  useEffect(() => {
    const calculateJweetTime = () => {
      let newTime = new Date(Date.now()) - new Date(date);
      setJweetTime(newTime);
    };
    calculateJweetTime();
  }, [date]);

  const updateJweet = async data => {
    setJweet({ ...jweet, ...data });
  };

  return (
    <div className="whiteBox Jweet-List">
      <div className="Jweet-User">
        <p className="Jweet-Name">
          <Link className="link" to={`/${name}`}>
            {name}
          </Link>
        </p>
        <p className="Jweet-Date">{`${prettyTime(jweetTime, {
          unitCount: 1
        })} ago`}</p>
      </div>
      <div className="Jweet-TextBox">
        <p className="Jweet-Text">{text}</p>
      </div>
      <div className="Jweet-StatBox">
        <h3 className="Jweet-StatHeading">
          <LikeJweetButton
            likes={likes}
            updateJweet={updateJweet}
            jweetId={_id}
          />
        </h3>
        <h3 className="Jweet-StatHeading">
          <RejweetButton
            rejweets={rejweets}
            updateJweet={updateJweet}
            jweetId={_id}
          />
        </h3>
      </div>
    </div>
  );
};

export default Jweet;
