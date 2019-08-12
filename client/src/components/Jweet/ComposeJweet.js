import React, { useState, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../../css/App.css';
import '../../css/ComposeJweet.css';
import UserContext from '../Users/UserContext';
import TextArea from '../TextArea';

const ComposeJweet = props => {
  const [formData, setFormData] = useState({
    text: ''
  });

  const formRef = useRef(null);

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
        setFormData({ text: '' });
        onPostJweet(response.data);
      }
    }
  };

  const { text } = formData;

  return (
    <div>
      <form
        className="whiteBox ComposeJweet-Form"
        ref={formRef}
        onSubmit={e => postJweet(e)}
      >
        <h1 className="Heading">Compose Jweet</h1>
        <TextArea
          placeHolder="Start a new jweet..."
          className="ComposeJweet-TextArea"
          name="text"
          value={text}
          maxlength="140"
          useInput={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          onSubmit={postJweet}
        />
        <button className="ComposeJweet-Button">Jweet!</button>
      </form>
    </div>
  );
};

export default withRouter(ComposeJweet);
