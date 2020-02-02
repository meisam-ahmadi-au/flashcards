import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { IReduxStates } from '../../store/reducers/states';
import SvgIcons from '../SvgIcons/SvgIcons';

const Logout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s: IReduxStates) => s.auth);
  const displayName = user ? user!.displayName || user!.email : 'Friend';
  const onLogout = () => dispatch(logout());

  return (
    <div className="navbar__logout">
      <h4>{`Hi ${displayName} !!!`}</h4>
      <SvgIcons
        iconId="logout"
        onClick={onLogout}
        title="logout"
        className="navbar__logout--button"
      />
    </div>
  );
};

export default Logout;
