import React from 'react';
import { ICard } from '../../util/interfaces';
import Styles from './Card.module.scss';

const Card: React.FC<ICard> = ({ front, back }) => {
  return (
    <div className={Styles.card}>
      <h4>{front}</h4>
      <h4>{back}</h4>
    </div>
  );
};

export default Card;
