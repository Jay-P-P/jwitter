import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import '../css/App.css';

const NavBar = () => {
  return (
    <nav className="NavBar">
      <ul className="NavBar-ul">
        <li className="NavBar-li">
          <Link className="NavBar-Link" to="/">
            Jwitter
          </Link>
        </li>
        <li className="NavBar-li">
          <Link className="NavBar-Link" to="/users">
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
