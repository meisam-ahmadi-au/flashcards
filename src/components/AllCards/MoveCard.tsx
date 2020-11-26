import React, { SyntheticEvent, useState } from 'react';
import { useReduxSelector } from '../../store/reduxHelpers';
import Styles from './MoveCard.module.scss';
import { useDispatch } from 'react-redux';
import { Actions } from '../../store/actions/actionTypes';
import { deleteCard, addCardThunks } from '../../store/actions/cardsActions';

const MoveCard: React.FC = () => {
  const allCategories = useReduxSelector().categories.categories;
  const currentCard = useReduxSelector().cards.card;
  const [categoryId, setCategoryId] = useState('0');
  const dispatch = useDispatch();
  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();
  const cancelDialogue = () => dispatch(Actions.cancelDialogue());
  const categoryChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategoryId(e.currentTarget.value);
  const submitHandler = async () => {
    console.log('Moveobject');
    await dispatch(addCardThunks(categoryId, currentCard));
    dispatch(deleteCard());
  };

  return (
    <div className={Styles['move-card']} onClick={stopPropagation}>
      <label className={Styles['move-card__title']} htmlFor="categories">
        Move card to:
      </label>
      <select
        className={Styles['move-card__ctegories']}
        name="category"
        id="category"
        value={categoryId}
        onChange={categoryChangeHandler}
      >
        <option value="0">Select a category</option>
        {allCategories.map(category => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.category}
          </option>
        ))}
      </select>
      <button className={Styles['move-card__button']} onClick={submitHandler}>
        Move
      </button>
      <button className={Styles['move-card__button']} onClick={cancelDialogue}>
        Cancel
      </button>
    </div>
  );
};

export default MoveCard;
