import React from 'react';
import Jweet from '../Jweet/Jweet';

const JweetsList = props => {
  const { jweets } = props;
  return (
    <div>
      {jweets
        ? jweets.map(jweet => {
            return <Jweet key={jweet._id} jweet={jweet} />;
          })
        : ''}
    </div>
  );
};

export default JweetsList;
