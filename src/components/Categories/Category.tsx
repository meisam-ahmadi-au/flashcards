import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import flashcardImageSrc from '../../assets/flashcard.jpg';
import SvgIcons from '../SvgIcons/SvgIcons';

interface IProps extends RouteComponentProps {
  totalNumberOfCards: number;
  tags: string;
  category: string;
  categoryId: number;
  createdAt: number;
}

const Deck: React.FC<IProps> = props => {
  const { totalNumberOfCards, category, history } = props;
  return (
    <div className="deck">
      <img src={flashcardImageSrc} alt={category} className="deck__image" />
      <h4 className="deck__name">{category}</h4>
      <div className="deck__extras">
        <span>{`${totalNumberOfCards} cards`}</span>
        <SvgIcons className="deck__svg" iconId="edit" strokeWidth="0" />
        <SvgIcons
          className="deck__svg"
          iconId="add"
          strokeWidth="0"
          onClick={() => history.push(`/categories/${category}/addcard`)}
        />
        <SvgIcons className="deck__svg " iconId="delete" strokeWidth="0" />
      </div>
    </div>
  );
};

export default withRouter(Deck);
