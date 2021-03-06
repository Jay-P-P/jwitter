import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputBar from '../InputBar';
import '../../css/App.css';
import '../../css/Login.css';
import LoginContext from '../Auth/LoginContext';
import UserContext from '../Users/UserContext';

const Login = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { history } = props;

  let loginContext = useContext(LoginContext);
  let userContext = useContext(UserContext);

  let [validationErrors, setValidationErrors] = useState({});

  const login = async event => {
    event.preventDefault();
    let user = {
      email,
      password
    };

    try {
      const body = JSON.stringify(user);
      let response = await axios.post('/api/users/login', body);
      const { status } = response;
      if (status === 200) {
        loginContext.loginUser();
        await userContext.updateUser(response.data.name);
        history.push('/home');
      }
    } catch (err) {
      if (typeof err === 'object') {
        if (err.response !== undefined) {
          const { status, data } = err.response;
          const { errors } = data;
          if (status === 400) {
            await setValidationErrors({ ...errors });
          }
        }
      }
    }
    return;
  };

  const { email, password } = formData;

  return (
    <div className="container">
      <form onSubmit={e => login(e)} className="whiteBox">
        <h1 className="Heading">Login</h1>
        {validationErrors['login'] && (
          <p className="Error">{validationErrors['login']}</p>
        )}
        <InputBar
          inputProps={{
            type: 'text',
            className: 'RegisterInputBar',
            name: 'email',
            value: email,
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
        <button type="submit" className="Button Login-LoginBtn">
          Login
        </button>
        <p className="Login-RegisterOption">
          No account? <Link to="/register">Sign up here.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
