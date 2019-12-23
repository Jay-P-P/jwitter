import React, { useContext, useRef } from 'react';
import axios from 'axios';
import UserContext from '../Users/UserContext';
import '../../css/DeleteJweetButton.css';

const DeleteJweetButton = props => {
  const { id, jweetAuthor, onDelete } = props;
  const userContext = useContext(UserContext);
  const button = useRef(null);

  const deleteJweet = async () => {
    let response = await axios.delete(`/api/jweets/${id}`);
    if (response.data.success === true) {
      onDelete(id);
    }
  };

  return (
    userContext.user.name === jweetAuthor && (
      <div className="DeleteJweetButton">
        <button
          ref={button}
          onMouseOver={() => (button.current.innerText = 'Delete')}
          onMouseLeave={() => (button.current.innerHTML = '&times;')}
          onClick={() => deleteJweet()}
        >
          &times;
        </button>
      </div>
    )
  );
};

export default DeleteJweetButton;
