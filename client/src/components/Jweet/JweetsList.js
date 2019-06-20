import React, { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Jweet from './Jweet';
import LikedJweet from './LikedJweet';
import UserContext from '../Users/UserContext';
import RejweetedJweet from './RejweetedJweet';
import LoadingCircle from '../LoadingCircle';
import '../../css/App.css';
import '../../css/Jweet.css';
import '../../css/JweetsList.css';

const JweetsList = props => {
  const userContext = useContext(UserContext);
  const { jweets, jweetsLoaded } = props;

  return (
    <div className="Jweet-List">
      <TransitionGroup>
        {(jweetsLoaded && jweets.length === 0 && (
          <CSSTransition timeout={500} unmountOnExit>
            <div className="Heading">No jweets.</div>
          </CSSTransition>
        )) ||
          (jweetsLoaded &&
            jweets.map(jweet => {
              if (jweet.isLike) {
                if (userContext.user.name !== jweet.user.name) {
                  return (
                    <CSSTransition
                      key={jweet._id}
                      timeout={1000}
                      classNames="JweetInList"
                    >
                      <section key={jweet._id} className="Jweet">
                        <LikedJweet key={jweet._id} jweet={jweet} />
                      </section>
                    </CSSTransition>
                  );
                }
              } else if (jweet.isRejweet) {
                if (userContext.user.name !== jweet.user.name) {
                  return (
                    <CSSTransition
                      key={jweet._id}
                      timeout={1000}
                      classNames="JweetInList"
                    >
                      <section key={jweet._id} className="Jweet">
                        <RejweetedJweet key={jweet._id} jweet={jweet} />
                      </section>
                    </CSSTransition>
                  );
                }
              }
              return (
                <CSSTransition
                  key={jweet._id}
                  timeout={1000}
                  classNames="JweetInList"
                >
                  <section key={jweet._id} className="Jweet">
                    <Jweet key={jweet._id} jweet={jweet} />
                  </section>
                </CSSTransition>
              );
            })) ||
          (!jweetsLoaded && (
            <CSSTransition timeout={500} classNames="NoJweets">
              <LoadingCircle />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default JweetsList;
