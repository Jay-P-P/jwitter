import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import JweetTime from './JweetTime';
import LikeJweetButton from './LikeJweetButton';
import '../../css/App.css';
import '../../css/Jweet.css';
import RejweetButton from './RejweetButton';

const Jweet = props => {
  const [jweet, setJweet] = useState({ ...props.jweet });
  const { user, text, date, likes, rejweets, _id } = jweet;

  const updateJweet = async data => {
    setJweet({ ...jweet, ...data });
  };

  return (
    <div className="whiteBox Jweet-Box">
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
      <IconContext.Provider value={{ className: 'Jweet-Symbol' }}>
        <div className="Jweet-StatBox">
          <div className="Jweet-StatHeading">
            {likes ? (
              <LikeJweetButton
                likes={likes}
                updateJweet={updateJweet}
                jweetId={_id}
              />
            ) : null}
          </div>
          <div className="Jweet-StatHeading">
            {rejweets ? (
              <RejweetButton
                rejweets={rejweets}
                updateJweet={updateJweet}
                jweetId={_id}
              />
            ) : null}
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Jweet;
