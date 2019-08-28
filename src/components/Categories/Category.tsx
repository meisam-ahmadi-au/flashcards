import React from 'react';
import flashcardImageSrc from '../../assets/flashcard.jpg';
import SvgIcons from '../SvgIcons/SvgIcons';

interface IProps {
  name: string;
}

const Deck = (props: IProps): JSX.Element => {
  return (
    <div className="deck">
      <div className="deck__icons">
        <SvgIcons className="deck__svg" iconId="edit" strokeWidth="0" />
        <SvgIcons className="deck__svg" iconId="add" strokeWidth="0" />
        <SvgIcons className="deck__svg" iconId="delete" strokeWidth="0" />
      </div>
      <img src={flashcardImageSrc} alt={props.name} className="deck__image" />
      <h4 className="deck__name">{props.name}</h4>
    </div>
  );
};

export default Deck;
