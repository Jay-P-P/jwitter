import React, { useState, useContext } from 'react';
import axios from 'axios';
import InputBar from '../InputBar';
import '../../css/App.css';
import '../../css/Login.css';
import config from '../../config/RequestHeaders';
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
      let response = await axios.post('/api/users/login', body, config);
      const { status } = response;
      if (status === 200) {
        loginContext.loginUser();
        await userContext.updateUser(response.data.name);
        history.push('/');
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
        {validationErrors['login'] ? (
          <p className="Error">{validationErrors['login']}</p>
        ) : (
          ''
        )}
        <InputBar
          inputType="text"
          labelName="Email"
          className="RegisterInputBar"
          name="email"
          value={email}
          useInput={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        >
          {validationErrors['email'] ? (
            <p className="Error">{validationErrors['email']}</p>
          ) : (
            ''
          )}
        </InputBar>
        <InputBar
          inputType="password"
          labelName="Password"
          className="RegisterInputBar"
          name="password"
          value={password}
          useInput={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        >
          {validationErrors['password'] ? (
            <p className="Error">{validationErrors['password']}</p>
          ) : (
            ''
          )}
        </InputBar>
        <button type="submit" className="Button Login-LoginBtn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
