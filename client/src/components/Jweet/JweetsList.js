import React from 'react';
import Jweet from '../Jweet/Jweet';

const JweetsList = props => {
  const { jweets } = props;
  return (
    <div>
      {jweets.length > 0 ? (
        jweets.map(jweet => {
          return <Jweet id={jweet._id} key={jweet._id} jweet={jweet} />;
        })
      ) : (
        <div className="whiteBox Heading">This user has no jweets.</div>
      )}
    </div>
  );
};

export default JweetsList;
