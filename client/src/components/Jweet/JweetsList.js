import React, { useContext } from 'react';
import Jweet from './Jweet';
import LikedJweet from './LikedJweet';
import UserContext from '../Users/UserContext';
import RejweetedJweet from './RejweetedJweet';

const JweetsList = props => {
  const userContext = useContext(UserContext);
  const { jweets } = props;

  return (
    <div>
      {jweets.length > 0 ? (
        jweets.map(jweet => {
          if (jweet.isLike) {
            if (userContext.user.name !== jweet.user.name) {
              return <LikedJweet key={jweet._id} jweet={jweet} />;
            } else {
              return null;
            }
          } else if (jweet.isRejweet) {
            if (userContext.user.name !== jweet.user.name) {
              return <RejweetedJweet key={jweet._id} jweet={jweet} />;
            } else {
              return null;
            }
          }
          return <Jweet key={jweet._id} jweet={jweet} />;
        })
      ) : (
        <div className="whiteBox Heading">This user has no jweets.</div>
      )}
    </div>
  );
};

export default JweetsList;
