import React from 'react';
import FirebaseAuthentication from '../FirebaseAuthentication/FirebaseAuthentication';
import ShowIf from '../ShowIf/ShowIf';
import Styles from './Home.module.scss';
import HomeImageAnimated from './HomeImageAnimated';

const Home = () => {
  return (
    <div className={Styles.home}>
      <h1>Welcome to Awesome flashcards</h1>
      <div className={Styles.home__hero}>
        <ShowIf.Logged>
          <FirebaseAuthentication />
        </ShowIf.Logged>
        <HomeImageAnimated />
      </div>
    </div>
  );
};

export default Home;
