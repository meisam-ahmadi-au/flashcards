import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { IReduxStates } from '../../store/reducers/states';

interface IChild {
  children: ReactNode;
}

export const Logged: React.FC<IChild> = ({ children }) => {
  const user = useSelector((state: IReduxStates) => state.auth.user);
  return user ? <>{children}</> : null;
};

export const NotLogged: React.FC<IChild> = ({ children }) => {
  const user = useSelector((state: IReduxStates) => state.auth.user);
  return !user ? <>{children}</> : null;
};

export default { NotLogged, Logged };
