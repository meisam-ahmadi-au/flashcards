import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Api from '../../api/Api';
import './Authenticate.scss';

interface IAuthProps extends RouteComponentProps {
  setAuthenticate: (a: boolean) => void;
}

class Authenticate extends Component<IAuthProps> {
  public state = {
    isAuthenticated: false,
    isChecking: false,
    password: '',
    username: ''
  };

  public authenticateUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      Api.signin(username, password).then(data => {
        this.props.setAuthenticate(true);
        this.props.history.push('/addcard');
      });
    }
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public render() {
    return (
      <>
        <form onSubmit={this.authenticateUser} className="auth">
          <label htmlFor="username">Username:</label>
          <input
            className="auth-input"
            type="text"
            name="username"
            onChange={this.onInputChange}
            value={this.state.username}
          />
          <label htmlFor="password">Password:</label>
          <input
            className="auth-input"
            type="password"
            name="password"
            onChange={this.onInputChange}
            value={this.state.password}
          />
          <button
            className="auth-submit"
            onClick={this.authenticateUser}
            type="submit"
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}

// @ts-ignore
export default withRouter(Authenticate);
