import React from 'react';
import { Link } from 'react-router-dom';
import Authenticate from '../Authenticate/Authenticate';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__item">
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/categories">
            Categories
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/categories/">
            Add Card
          </Link>
        </li>
      </ul>
      <Authenticate />
    </nav>
  );
};

export default Navbar;
