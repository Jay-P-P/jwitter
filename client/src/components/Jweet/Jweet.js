import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import JweetTime from './JweetTime';
import LikeJweetButton from './LikeJweetButton';
import '../../css/App.css';
import '../../css/Jweet.css';
import RejweetButton from './RejweetButton';
import Avatar from '../Users/Avatar';

const Jweet = props => {
  const [jweet, setJweet] = useState({ ...props.jweet });
  const { user, text, date, likes, rejweets, _id } = jweet;

  const updateJweet = async data => {
    setJweet({ ...jweet, ...data });
  };

  return (
    <div className="Jweet-Box">
      <div className="Jweet-User">
        {user ? (
          <>
            <Avatar className="Jweet-Avatar" url={user.avatar} />
            <div className="Jweet-Name">
              <Link className="link" to={`/${user.name}`}>
                {`${user.name}`}
              </Link>
            </div>
          </>
        ) : (
          <div className="Jweet-Name">User Deleted</div>
        )}
        {date && <JweetTime date={date} />}
      </div>
      <div className="Jweet-TextBox">
        <p className="Jweet-Text">{text}</p>
      </div>
      <IconContext.Provider value={{ className: 'Jweet-Symbol' }}>
        <div className="Jweet-StatBox">
          <div className="Jweet-StatHeading">
            {likes && (
              <LikeJweetButton
                likes={likes}
                updateJweet={updateJweet}
                jweetId={_id}
              />
            )}
          </div>
          <div className="Jweet-StatHeading">
            {rejweets && (
              <RejweetButton
                rejweets={rejweets}
                updateJweet={updateJweet}
                jweetId={_id}
              />
            )}
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Jweet;
