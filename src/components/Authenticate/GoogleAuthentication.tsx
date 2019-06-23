import React from 'react';
import './GoogleAuthentication.scss';

const GoogleAuthentication = () => (
  <div>
    <ul className="auth">
      <li>Sign in</li>
      <li>Sign up</li>
      <li className="auth-hidden">Sign out</li>
    </ul>
  </div>
);

export default GoogleAuthentication;
