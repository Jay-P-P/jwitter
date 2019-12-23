import React, { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Jweet from './Jweet';
import LikedJweet from './LikedJweet';
import UserContext from '../Users/UserContext';
import RejweetedJweet from './RejweetedJweet';
import LoadingCircle from '../LoadingCircle';
import DeleteJweetButton from './DeleteJweetButton';
import '../../css/App.css';
import '../../css/JweetsList.css';

const JweetsList = props => {
  const userContext = useContext(UserContext);
  const { jweets, jweetsLoaded, onDeleteJweet } = props;

  const deleteJweet = id => {
    onDeleteJweet(id);
  };

  const renderJweet = (jweet, index) => {
    return (
      <CSSTransition
        key={jweet._id}
        in={jweetsLoaded}
        timeout={1000}
        classNames="JweetInList"
      >
        {(jweet.isLike && userContext.user.name !== jweet.user.name && (
          <section key={jweet._id} className="JweetsList-Jweet">
            <LikedJweet jweet={jweet} />
            <DeleteJweetButton
              onDelete={deleteJweet}
              jweetAuthor={jweet.user ? jweet.user.name : 'User Deleted'}
              id={jweet._id}
            />
          </section>
        )) ||
          (jweet.isRejweet && userContext.user.name !== jweet.user.name && (
            <section key={jweet._id} className="JweetsList-Jweet">
              <RejweetedJweet jweet={jweet} />
              <DeleteJweetButton
                onDelete={deleteJweet}
                jweetAuthor={jweet.user ? jweet.user.name : 'User Deleted'}
                id={jweet._id}
                index={index}
              />
            </section>
          )) || (
            <section key={jweet._id} className="JweetsList-Jweet">
              <Jweet jweet={jweet} />
              <DeleteJweetButton
                onDelete={deleteJweet}
                jweetAuthor={jweet.user ? jweet.user.name : 'User Deleted'}
                id={jweet._id}
                index={index}
              />
            </section>
          )}
      </CSSTransition>
    );
  };

  return (
    <div className="Jweet-List">
      <TransitionGroup>
        <>
          {(jweetsLoaded && jweets.length === 0 && (
            <CSSTransition timeout={500} classNames="JweetInList">
              <div className="whiteBox Heading">No jweets.</div>
            </CSSTransition>
          )) ||
            (jweetsLoaded && jweets.map(renderJweet)) ||
            (!jweetsLoaded && <LoadingCircle />)}
        </>
      </TransitionGroup>
    </div>
  );
};

export default JweetsList;
