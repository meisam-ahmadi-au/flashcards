import React, { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '../../store/actions/actionTypes';
import { deleteCard } from '../../store/actions/cardsActions';
import Styles from './DeleteCard.module.scss';

const DeleteCard: React.FC = () => {
  const dispatch = useDispatch();
  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();
  const deleteHandler = () => dispatch(deleteCard());
  const cancelDialogue = () => dispatch(Actions.cancelDialogue());

  return (
    <div className={Styles['delete-card']} onClick={stopPropagation}>
      <h3 className={Styles['delete-card__title']}>
        Are you sure you want to delete this card?
      </h3>
      <button className={Styles['delete-card__no']} onClick={cancelDialogue}>
        No
      </button>
      <button className={Styles['delete-card__yes']} onClick={deleteHandler}>
        Yes
      </button>
    </div>
  );
};

export default DeleteCard;
