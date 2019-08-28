import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

class LoginWithEmailForm extends Component<RouteComponentProps> {
  public state = {
    isChecking: false,
    password: '',
    username: ''
  };

  public authenticateUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      auth
        .signInWithEmailAndPassword(username, password)
        .then(signin => {
          console.log({ signin });
          this.props.history.push('/addcard');
          this.setState({ password: '' });
        })
        .catch(err => {
          this.props.history.push('/');
        });
    }
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public render() {
    return (
      <form onSubmit={this.authenticateUser} className="auth">
        <input
          className="auth__input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={this.onInputChange}
          value={this.state.username}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.onInputChange}
          value={this.state.password}
        />
        <button className="auth__button" onClick={this.authenticateUser}>
          Login
        </button>
      </form>
    );
  }
}

export default withRouter(LoginWithEmailForm);
