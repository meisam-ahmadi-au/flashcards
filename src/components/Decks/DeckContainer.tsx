import React from 'react';
import Data from '../../sampleData';
import './DeckContainer.scss';
import Category from './Decks';

const DecksContainer = () => {
  const cardDecks = Data.categories.map(cat => (
    <Category name={cat} key={cat} />
  ));

  return <div className="deck-container">{cardDecks}</div>;
};

export default DecksContainer;
