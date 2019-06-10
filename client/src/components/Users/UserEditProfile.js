import React, { useState, useContext } from 'react';
import axios from 'axios';
import InputBar from '../InputBar';
import TextArea from '../TextArea';
import UserContext from './UserContext';
import '../../css/UserEditProfile.css';
import config from '../../config/RequestHeaders';

const UserEditProfile = props => {
  const { history } = props;
  let userContext = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: userContext.user.name,
    password: '',
    bio: userContext.user.bio,
    email: userContext.user.email
  });

  const { name, email, bio } = formData;

  const updateProfile = async event => {
    event.preventDefault();
    event.stopPropagation();
    let newUser = {
      email,
      name,
      bio
    };
    console.log(history);

    const body = JSON.stringify(newUser);
    let response = await axios.patch(`/api/users/${name}`, body, config);
    if (response.status === 204) {
      history.push('/home');
    }
  };

  return (
    <div className="container">
      <form onSubmit={e => updateProfile(e)} className="whiteBox">
        <h1 className="Heading">Update Profile</h1>
        <InputBar
          inputType="text"
          labelName="Name"
          className="UserEditProfile-InputBar"
          name="name"
          value={name}
          useInput={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <InputBar
          inputType="text"
          labelName="Email"
          className="UserEditProfile-InputBar"
          name="email"
          value={email}
          useInput={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <TextArea
          labelName="Bio"
          className="UserEditProfile-TextArea"
          name="bio"
          value={bio}
          cols="30"
          rows="5"
          maxlength="140"
          useInput={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <button type="submit" className="Button UserEditProfile-SaveBtn">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserEditProfile;
