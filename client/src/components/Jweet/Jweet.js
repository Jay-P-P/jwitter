import React, { useState, useEffect } from 'react';
import prettyTime from 'pretty-ms';
import '../../css/Jweet.css';

const Jweet = props => {
  const { jweet } = props;
  const { user, text, date, likes, rejweets } = jweet;
  const { name } = user;
  const [jweetTime, setJweetTime] = useState(0);

  useEffect(() => {
    const calculateJweetTime = () => {
      let newTime = new Date(Date.now()) - new Date(date);
      setJweetTime(newTime);
    };
    calculateJweetTime();
  }, [date]);

  return (
    <div className="whiteBox Jweet-List">
      <div className="Jweet-User">
        <p className="Jweet-Name">{name}</p>
        <p className="Jweet-Date">{`${prettyTime(jweetTime, {
          unitCount: 1
        })} ago`}</p>
      </div>
      <div className="Jweet-TextBox">
        <p className="Jweet-Text">{text}</p>
      </div>
      <div className="Jweet-StatBox">
        <h3 className="Jweet-StatHeading">
          <span className="Jweet-Stat">{likes.length}</span> Likes
        </h3>
        <h3 className="Jweet-StatHeading">
          <span className="Jweet-Stat">{rejweets.length}</span> Rejweets
        </h3>
      </div>
    </div>
  );
};

export default Jweet;
