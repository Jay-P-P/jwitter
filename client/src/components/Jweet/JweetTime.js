import React, { useEffect, useState } from 'react';
import prettyTime from 'pretty-ms';
import '../../css/Jweet.css';

const JweetTime = props => {
  const { date } = props;
  const [jweetTime, setJweetTime] = useState(0);
  useEffect(() => {
    const calculateJweetTime = () => {
      let newTime = new Date(Date.now()) - new Date(date);
      setJweetTime(newTime);
    };
    calculateJweetTime();
  }, [date]);

  return (
    <p className="Jweet-Date">
      {date
        ? `${prettyTime(jweetTime, {
            unitCount: 1
          })} ago`
        : null}
    </p>
  );
};

export default JweetTime;
