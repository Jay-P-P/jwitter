import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputBar from '../InputBar';
import '../../css/App.css';
import '../../css/Register.css';

const Register = props => {
  const { history } = props;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  let [validationErrors, setValidationErrors] = useState({});

  const onSubmit = async event => {
    event.preventDefault();
    let newUser = {
      name,
      email,
      password,
      passwordConfirmation
    };

    try {
      const body = JSON.stringify(newUser);
      let response = await axios.post('/api/users/register', body);
      const { status } = response;
      if (status === 201) {
        history.push('/login');
      }
    } catch (err) {
      const { status, data } = err.response;
      const { errors } = data;
      if (status === 400) {
        await setValidationErrors({ ...errors });
      }
    }
  };

  const { name, email, password, passwordConfirmation } = formData;

  return (
    <div className="container Register-Container">
      <form className="whiteBox Register-Form" onSubmit={e => onSubmit(e)}>
        <h1 className="Heading">Register</h1>
        <InputBar
          inputProps={{
            type: 'text',
            name: 'name',
            value: name,
            className: 'RegisterInputBar',
            onChange: e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
          }}
          labelName="Username"
        >
          {validationErrors['name'] && (
            <p className="Error">{validationErrors['name']}</p>
          )}
        </InputBar>
        <InputBar
          inputProps={{
            type: 'email',
            name: 'email',
            value: email,
            className: 'RegisterInputBar',
            onChange: e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
          }}
          labelName="Email"
        >
          {validationErrors['email'] && (
            <p className="Error">{validationErrors['email']}</p>
          )}
        </InputBar>
        <InputBar
          inputProps={{
            type: 'password',
            name: 'password',
            value: password,
            className: 'RegisterInputBar',
            onChange: e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
          }}
          labelName="Password"
        >
          {validationErrors['password'] && (
            <p className="Error">{validationErrors['password']}</p>
          )}
        </InputBar>
        <InputBar
          inputProps={{
            type: 'password',
            name: 'passwordConfirmation',
            value: passwordConfirmation,
            className: 'RegisterInputBar',
            onChange: e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
          }}
          labelName="Re-enter Password"
        >
          {validationErrors['passwordConfirmation'] && (
            <p className="Error">{validationErrors['passwordConfirmation']}</p>
          )}
        </InputBar>
        <button type="submit" className="Button Register-RegisterBtn">
          Register
        </button>
        <p className="Register-LoginOption">
          Have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
