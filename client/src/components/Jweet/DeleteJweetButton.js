import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../Users/UserContext';
import '../../css/DeleteJweetButton.css';

const DeleteJweetButton = props => {
  const { id, jweetAuthor, onDelete } = props;
  const userContext = useContext(UserContext);
  const [buttonText, setButtonText] = useState('X');

  const deleteJweet = async () => {
    let response = await axios.delete(`/api/jweets/${id}`);
    if (response.data.success === true) {
      onDelete(id);
    }
  };

  return (
    userContext.user.name === jweetAuthor && (
      <div
        onMouseEnter={() => setButtonText('Delete Jweet')}
        onMouseLeave={() => setButtonText('X')}
        className="DeleteJweetButton"
      >
        <button onClick={() => deleteJweet()}>
          <span>{buttonText}</span>
        </button>
      </div>
    )
  );
};

export default DeleteJweetButton;
