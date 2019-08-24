import React from 'react';
import { Link } from 'react-router-dom';
import Authenticate from '../Authenticate/Authenticate';

import './Navbar.scss';
interface IProps {
  setAuthenticate: (a: boolean) => void;
  isAuthenticated: boolean;
}
const Navbar = (props: IProps) => {
  return (
    <div className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__item">
          <Link to="/home">Home</Link>
        </li>
        <li className="navbar__item">
          <Link to="/categories">Categories</Link>
        </li>
        <li className="navbar__item">Add Card</li>
      </ul>
      <Authenticate
        setAuthenticate={props.setAuthenticate}
        isAuthenticated={props.isAuthenticated}
      />
    </div>
  );
};

export default Navbar;
