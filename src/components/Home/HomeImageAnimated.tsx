import React from 'react';
import flascardImage from '../../assets/flashcard.png';
import loginImage from '../../assets/home3.png';
import { randomBackgroundColor } from '../../util/helpers';
import Styles from './HomeImageAnimated.module.scss';

const HomeImageAnimated = () => {
  return (
    <div className={Styles['home-image']}>
      <img
        src={loginImage}
        alt="Login"
        className={Styles['home-image__hero']}
      />
      <img
        src={flascardImage}
        alt="flashcard"
        className={Styles['home-image__icons']}
        style={randomBackgroundColor()}
      />
      <img
        src={flascardImage}
        alt="flashcard"
        className={Styles['home-image__icons']}
        style={randomBackgroundColor()}
      />
      <img
        src={flascardImage}
        alt="flashcard"
        className={Styles['home-image__icons']}
        style={randomBackgroundColor()}
      />
      <img
        src={flascardImage}
        alt="flashcard"
        className={Styles['home-image__icons']}
        style={randomBackgroundColor()}
      />
    </div>
  );
};

export default HomeImageAnimated;
