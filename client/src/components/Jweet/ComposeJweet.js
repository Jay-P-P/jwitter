import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import InputBar from '../InputBar';
import '../../css/App.css';
import '../../css/ComposeJweet.css';
import UserContext from '../Users/UserContext';

const ComposeJweet = props => {
  const [formData, setFormData] = useState({
    text: ''
  });

  let userContext = useContext(UserContext);

  const { onPostJweet } = props;

  const postJweet = async event => {
    event.preventDefault();
    event.stopPropagation();
    if (text.length > 0) {
      let jweet = {
        text
      };
      const body = JSON.stringify(jweet);
      let response = await axios.post('/api/jweets/', body);
      if (response.status === 201) {
        await userContext.updateUser(userContext.user.name);
        setFormData({ ...formData, text: '' });
        onPostJweet();
      }
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
