import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getAllCardsInCategory } from '../../store/actions/cardsActions';
import { IReduxStates } from '../../store/reducers/states';
import { ICard, IUpdateCard } from '../../util/interfaces';
import Styles from './AllCards.module.scss';
import Card from './Card';

const AllCards: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch();
  const { category } = props.match.params as { category: string };
  const user = useSelector((s: IReduxStates) => s.auth.user);
  const [allCards, setAllCards] = React.useState([] as ICard[]);
  const [keyword, setKeyword] = React.useState('');
  // const allCards = useSelector((s: IReduxStates) => s.cards.cards);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setKeyword(value.trim());
  };

  const filteredCards = (cards: ICard[], searchTerm: string) => {
    if (!searchTerm) {
      return cards;
    } else {
      return cards.filter(
        card =>
          card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.back.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  // #region toBeDeleted
  const deleteCard = (cardId: string) => {
    const newCards = allCards.filter(card => card.cardId !== cardId);
    setAllCards(newCards);
  };

  const updateCard = (updatedCard: IUpdateCard) => {
    const newCards = allCards.map(card => {
      if (card.cardId === updatedCard.cardId) {
        return {
          ...card,
          ...updatedCard
        };
      } else {
        return card;
      }
    });
    setAllCards(newCards);
  };
  // #endregion

  React.useEffect(() => {
    dispatch(getAllCardsInCategory(category));
  }, [user, category]);

  return (
    <div className={Styles['all-cards']}>
      <h3 className={Styles['all-cards__title']}>
        {`All Cards in ${category}`}
      </h3>
      <input
        className={Styles['all-cards__search']}
        type="text"
        onChange={changeHandler}
        placeholder="Search"
      />
      {filteredCards(allCards, keyword).map(card => (
        <Card
          key={card.cardId}
          {...card}
          category={category}
          deleteCard={deleteCard}
          updateCard={updateCard}
        />
      ))}
    </div>
  );
};

export default AllCards;
