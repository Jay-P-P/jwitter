import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import '../css/Landing.css';

const Landing = () => {
  return (
    <div className="container Landing-Grid">
      <h1 className="Landing-Heading">
        Welcome to <span className="Landing-Special">Jwitter.</span>
      </h1>
      <Link className="Button Landing-RegisterBtn" to="/register">
        Register
      </Link>
      <Link className="Button Landing-LoginBtn" to="/login">
        Login
      </Link>
      <h1 className="Landing-Alternative">
        <Link className="link" to="/users">
          Or Search Users
        </Link>
      </h1>
    </div>
  );
};

export default Landing;
