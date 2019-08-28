import React from 'react';
import { googleSignIn } from '../../firebase/firebase';
import LoginWithEmailForm from './LoginWithEmailForm';

const Login = () => {
  const [isLoginWithEmail, setisLoginWithEmail] = React.useState(false);

  return (
    <div>
      {isLoginWithEmail ? (
        <LoginWithEmailForm />
      ) : (
        <>
          <button
            className="auth__button"
            onClick={() => setisLoginWithEmail(true)}
          >
            Signup with Email
          </button>
          <button
            className="auth__button"
            onClick={() => setisLoginWithEmail(true)}
          >
            Signin with Email
          </button>
          <button className="auth__button" onClick={googleSignIn}>
            Google Sign-in
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
