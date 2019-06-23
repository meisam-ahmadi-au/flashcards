import React from 'react';
import flashcardImageSrc from '../../assets/flashcard.jpg';

interface IProps {
  name: string;
}

const Deck = (props: IProps): JSX.Element => {
  return (
    <div className="deck">
      <img src={flashcardImageSrc} alt={props.name} className="deck-image" />
      <p className="deck-name">{props.name}</p>
    </div>
  );
};

export default Deck;
