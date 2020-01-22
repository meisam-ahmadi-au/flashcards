import { User as FirebaseUser } from 'firebase';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { logout } from '../../store/actions/authActions';
import SvgIcons from '../SvgIcons/SvgIcons';

interface IProps extends RouteComponentProps {
  user: FirebaseUser | null;
  logout: () => void;
}

const Logout = (props: IProps) => {
  const user: null | FirebaseUser = props.user;
  const displayName = user ? user!.displayName || user!.email : 'Friend';

  const onLogout = () => {
    props.logout();
    props.history.push('/');
  };

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

const mapStateToProps = (state: any) => ({
  user: state.auth.user
});
export default connect(mapStateToProps, { logout })(withRouter(Logout));
