import React from 'react';
import {Link } from 'react-router-dom';
import Authenticate from '../Authenticate/Authenticate'

import './Navbar.scss';
interface IProps  {
  setAuthenticate: (a: boolean) => void;
}
const Navbar = (props: IProps) => {
  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item"><Link to="/home">Home</Link></li>
        <li className="navbar-item">Categories</li>
        <li className="navbar-item">Add Card</li>
      </ul>
      <Authenticate setAuthenticate={props.setAuthenticate}></Authenticate>
    </div>
      )
}

export default Navbar
