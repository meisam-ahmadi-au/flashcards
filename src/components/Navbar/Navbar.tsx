import React from 'react';
import { Link } from 'react-router-dom';
import Authenticate from '../Authenticate/Authenticate';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__item">
          <Link to="/home">Home</Link>
        </li>
        <li className="navbar__item">
          <Link to="/categories">Categories</Link>
        </li>
        <li className="navbar__item">Add Card</li>
      </ul>
      <Authenticate />
    </nav>
  );
};

export default Navbar;
