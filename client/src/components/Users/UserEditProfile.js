import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import InputBar from '../InputBar';
import TextArea from '../TextArea';
import UserContext from './UserContext';
import '../../css/UserEditProfile.css';
import Avatar from './Avatar';

const UserEditProfile = props => {
  const { history } = props;
  let userContext = useContext(UserContext);
  const fileInput = useRef(null);
  const avatarForm = useRef(null);
  let [image, setImage] = useState(() => {
    return userContext.user.avatar;
  });

  const [formData, setFormData] = useState(() => {
    return {
      name: userContext.user.name,
      password: '',
      bio: userContext.user.bio,
      email: userContext.user.email
    };
  });

  let [validationErrors, setValidationErrors] = useState({});

  const { name, email, bio } = formData;

  const updateProfile = async event => {
    event.preventDefault();
    event.stopPropagation();
    let newUser = {
      email,
      name,
      bio,
      id: userContext.user._id
    };

    const body = JSON.stringify(newUser);
    try {
      let response = await axios.patch(`/api/users`, body);
      if (response.status === 204) {
        await userContext.updateUser(name);
        history.push('/home');
      }
    } catch (err) {
      const { status, data } = err.response;
      if (status === 400) {
        setValidationErrors({ ...data });
      }
    }
  };

  const uploadProfile = async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('avatar', fileInput.current.files[0]);
    let response = await axios.post('/api/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setImage(response.data.avatar);
    await userContext.updateUser(name);
    history.push('/home');
  };

  return (
    <div className="container">
      <form
        onSubmit={e => uploadProfile(e)}
        method="POST"
        name="avatar"
        encType="multipart/form-data"
        className="whiteBox UserEditProfile-Avatar-Form"
        ref={avatarForm}
      >
        <h1 className="Heading">Update Avatar</h1>
        <Avatar className="UserEditProfile-Avatar" url={image} />
        <input
          className="UserEditProfile-Avatar-InputBar"
          type="file"
          accept="image/*"
          name="avatar"
          ref={fileInput}
        />
        <button className="Button UserEditProfile-SaveBtn" type="submit">
          Save
        </button>
      </form>
      <form onSubmit={e => updateProfile(e)} className="whiteBox">
        <h1 className="Heading">Update Profile</h1>
        <InputBar
          inputType="text"
          labelName="Name"
          className="UserEditProfile-InputBar"
          name="name"
          value={name}
          onChangeHandler={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        >
          {validationErrors['name'] && (
            <p className="Error">{validationErrors['name']}</p>
          )}
        </InputBar>
        <InputBar
          inputType="text"
          labelName="Email"
          className="UserEditProfile-InputBar"
          name="email"
          value={email}
          onChangeHandler={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        >
          {validationErrors['email'] && (
            <p className="Error">{validationErrors['email']}</p>
          )}
        </InputBar>
        <TextArea
          labelName="Bio"
          className="UserEditProfile-TextArea"
          name="bio"
          value={bio}
          cols="30"
          rows="5"
          maxlength="140"
          onChangeHandler={e =>
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
