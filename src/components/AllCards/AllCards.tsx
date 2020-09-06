import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getAllCardsInCategory } from '../../store/actions/cardsActions';
import { IReduxStates } from '../../store/reducers/states';
import { ICard } from '../../util/interfaces';
import Styles from './AllCards.module.scss';
import Card from './Card';
import { DialogueType } from '../../store/reducers/generalReducers';
import { Actions } from '../../store/actions/actionTypes';
import { Modal } from '../Portal/Portal';
import DeleteCard from './DeleteCard';
import UpdateCard from './UpdateCard';
import MoveCard from './MoveCard';

const AllCards: React.FC = () => {
  const dispatch = useDispatch();
  const allCards = useSelector((s: IReduxStates) => s.cards.cards);
  const { category } = useParams();
  const [keyword, setKeyword] = React.useState('');
  const showConfirmation = useSelector(
    (s: IReduxStates) => s.general.showDialogue
  );
  const cancelDialogue = () => dispatch(Actions.cancelDialogue());
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setKeyword(value.trimStart());
  };

  const filteredCards = React.useCallback(
    (cards: ICard[], searchTerm: string) => {
      if (!searchTerm) {
        return cards;
      } else {
        return cards.filter(
          card =>
            card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.back.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    },
    []
  );

  React.useEffect(() => {
    if (category) {
      dispatch(getAllCardsInCategory(category));
    }
  }, [dispatch, category]);

  const allModals = (dialogueType: string) => {
    switch (dialogueType) {
      case DialogueType.DELETE:
        return <DeleteCard />;
      case DialogueType.UPDATE:
        return <UpdateCard />;
      case DialogueType.MOVE:
        return <MoveCard />;
      default:
        return null;
    }
  };

  return (
    <div className={Styles['all-cards']}>
      {showConfirmation && (
        <Modal onClick={cancelDialogue}>{allModals(showConfirmation)}</Modal>
      )}
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
