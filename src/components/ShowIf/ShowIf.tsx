import React from 'react';
import { useSelector } from 'react-redux';
import { IReduxStates } from '../../store/reducers/states';
import { Redirect } from 'react-router-dom';

export const Logged: React.FC = ({ children }) => {
  const user = useSelector((state: IReduxStates) => state.auth?.user);
  return user ? <>{children}</> : <Redirect to="/" />;
};

export const NotLogged: React.FC = ({ children }) => {
  const user = useSelector((state: IReduxStates) => state.auth?.user);
  return !user ? <>{children}</> : null;
};

export default { NotLogged, Logged };
