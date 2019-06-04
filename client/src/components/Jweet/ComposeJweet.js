import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import InputBar from '../InputBar';
import config from '../../config/RequestHeaders';
import '../../css/ComposeJweet.css';
import UserContext from '../Users/UserContext';

const ComposeJweet = props => {
  const [formData, setFormData] = useState({
    text: ''
  });

  let userContext = useContext(UserContext);

  const { history } = props;

  const postJweet = async event => {
    event.preventDefault();
    event.stopPropagation();
    let jweet = {
      text
    };
    const body = JSON.stringify(jweet);
    let response = await axios.post('/api/jweets/', body, config);
    if (response.status === 201) {
      await userContext.updateUser(userContext.user.name);
      setFormData({ ...formData, text: '' });
      history.push('/home');
    }
  };

  const { text } = formData;

  return (
    <div>
      <form className="whiteBox ComposeJweet-Form" onSubmit={e => postJweet(e)}>
        <h1 className="Heading">Compose a new jweet</h1>
        <InputBar
          inputType="text"
          placeHolder="Start a new jweet..."
          className="ComposeJweet-InputBar"
          name="text"
          value={text}
          useInput={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </form>
    </div>
  );
};

export default withRouter(ComposeJweet);
