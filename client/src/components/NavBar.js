import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import '../css/App.css';

const NavBar = () => {
  return (
    <nav className="NavBar">
      <ul className="NavBar-ul">
        <li className="NavBar-li">
          <Link className="NavBar-Link Logo" to="/">
            <span>J</span>
            <span>w</span>
            <span>i</span>
            <span>t</span>
            <span>t</span>
            <span>e</span>
            <span>r</span>
          </Link>
        </li>
        <li className="NavBar-li">
          <Link className="NavBar-Link Link" to="/users">
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
