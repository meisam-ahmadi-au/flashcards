import { User as FirebaseUser } from 'firebase';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { signout } from '../../firebase/firebase';
import { UsersContext } from '../../providers/UsersProvider';

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
      <button onClick={onLogout} className="auth__button">
        Logout
      </button>
    </div>
  );
};

export default withRouter(Logout);
