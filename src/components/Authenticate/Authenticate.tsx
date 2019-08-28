import React, { Component } from 'react';
import { UsersContext } from '../../providers/UsersProvider';
import './Authenticate.scss';
import Login from './Login';
import Logout from './Logout';

class Authenticate extends Component {
  public render() {
    const isAuthenticated = this.context;
    return (
      <div className="auth">{isAuthenticated ? <Logout /> : <Login />}</div>
    );
  }
}
Authenticate.contextType = UsersContext;
export default Authenticate;
