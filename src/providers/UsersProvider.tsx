import { Unsubscribe as FirebaseUnsubscribe } from 'firebase';
import React, { Component } from 'react';
import { auth } from '../firebase/firebase';
import { createUserProfile } from '../firebase/firebaseAuthenticate';

export const UsersContext = React.createContext(null);

class UsersProvider extends Component {
  public state = {
    user: null
  };
  public unsubscribeFromAuthentication: FirebaseUnsubscribe | null = null;

  public componentDidMount = async () => {
    this.unsubscribeFromAuthentication = auth.onAuthStateChanged(
      async userAuth => {
        console.log({ userAuth });
        if (!userAuth) {
          return this.setState({ user: null });
        }

        const userRef = await createUserProfile(userAuth);
        if (userRef) {
          userRef.onSnapshot(userSnapshot => {
            return this.setState({
              user: {
                uid: userSnapshot.id,
                ...userSnapshot.data()
              }
            });
          });
        } else {
          return this.setState({ user: userAuth });
        }
      }
    );
  };

  public componentWillUnmount() {
    if (this.unsubscribeFromAuthentication) {
      this.unsubscribeFromAuthentication();
    }
  }

  public render() {
    const { user } = this.state;
    const { children } = this.props;

    return (
      <UsersContext.Provider value={user}>{children}</UsersContext.Provider>
    );
  }
}

export default UsersProvider;
