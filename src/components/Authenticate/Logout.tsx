import { User as FirebaseUser } from 'firebase';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { signout } from '../../firebase/firebase';
import { UsersContext } from '../../providers/UsersProvider';
import SvgIcons from '../SvgIcons/SvgIcons';

const Logout = (props: RouteComponentProps) => {
  const user: null | FirebaseUser = React.useContext(UsersContext);
  const displayName = user ? user!.displayName || user!.email : 'Friend';

  const onLogout = () => {
    signout();
    props.history.push('/');
  };

  return (
    <div className="auth__logout">
      <h4>{`Hi ${displayName} !!!`}</h4>
      <SvgIcons
        iconId="logout"
        onClick={onLogout}
        title="logout"
        className="auth__logout--button"
      />
    </div>
  );
};

export default withRouter(Logout);