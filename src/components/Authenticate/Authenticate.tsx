import React, { Component } from 'react';
import Api from '../../api/Api';

class Authenticate extends Component {
  public state = {
    isAuthenticated: false,
    isChecking: false,
    password: '',
    username: ''
  };

  public authenticateUser = () => {
    const { username, password } = this.state;
    if (username && password) {
      Api.signin(username, password).then(data => {
        // @ts-ignore
        console.log(data.tokenId);
        console.log(this.props);
        // @ts-ignore
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
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          onChange={this.onInputChange}
          value={this.state.username}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={this.onInputChange}
          value={this.state.password}
        />
        <button onClick={this.authenticateUser} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default Authenticate;
