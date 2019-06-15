import React, { useContext } from 'react';
import Jweet from './Jweet';
import LikedJweet from './LikedJweet';
import UserContext from '../Users/UserContext';
import RejweetedJweet from './RejweetedJweet';
import '../../css/Jweet.css';

const JweetsList = props => {
  const userContext = useContext(UserContext);
  const { jweets } = props;

  return (
    <div className="whiteBox">
      {jweets.length > 0 ? (
        jweets.map(jweet => {
          if (jweet.isLike) {
            if (userContext.user.name !== jweet.user.name) {
              return (
                <section key={jweet._id} className="Jweet">
                  <LikedJweet key={jweet._id} jweet={jweet} />
                </section>
              );
            } else {
              return null;
            }
          } else if (jweet.isRejweet) {
            if (userContext.user.name !== jweet.user.name) {
              return (
                <section key={jweet._id} className="Jweet">
                  <RejweetedJweet key={jweet._id} jweet={jweet} />
                </section>
              );
            } else {
              return null;
            }
          }
          return (
            <section key={jweet._id} className="Jweet">
              <Jweet key={jweet._id} jweet={jweet} />
            </section>
          );
        })
      ) : (
        <div className="whiteBox Heading">This user has no jweets.</div>
      )}
    </div>
  );
};

export default JweetsList;
