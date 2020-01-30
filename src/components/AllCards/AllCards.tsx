import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getAllCardsInCategory } from '../../store/actions/cardsActions';
import { IReduxStates } from '../../store/reducers/states';
import { ICard } from '../../util/interfaces';
import Styles from './AllCards.module.scss';
import Card from './Card';

const AllCards: React.FC = () => {
  const dispatch = useDispatch();
  const allCards = useSelector((s: IReduxStates) => s.cards.cards);
  const { category } = useParams();
  const [keyword, setKeyword] = React.useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setKeyword(value.trimStart());
  };

  const filteredCards = useCallback((cards: ICard[], searchTerm: string) => {
    if (!searchTerm) {
      return cards;
    } else {
      return cards.filter(
        card =>
          card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.back.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, []);

  React.useEffect(() => {
    if (category) {
      dispatch(getAllCardsInCategory(category));
    }
  }, [dispatch, category]);

  return (
    <div className={Styles['all-cards']}>
      <div className={Styles['all-cards__title']}>
        <h2>{`All Cards in ${category}`}</h2>
        <h5>{allCards.length > 0 && `${allCards.length} cards`}</h5>
      </div>
      <input
        className={Styles['all-cards__search']}
        type="text"
        onChange={changeHandler}
        placeholder="Search"
        value={keyword}
      />
      {filteredCards(allCards, keyword).map(card => (
        <Card key={card.cardId} {...card} category={category} />
      ))}
    </div>
  );
};

export default AllCards;
