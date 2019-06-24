import React, { useState, useContext } from 'react';
import axios from 'axios';
import InputBar from '../InputBar';
import TextArea from '../TextArea';
import UserContext from './UserContext';
import '../../css/UserEditProfile.css';

const UserEditProfile = props => {
  const { history } = props;
  let userContext = useContext(UserContext);
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
    console.log(body);
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
          useInput={e =>
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
