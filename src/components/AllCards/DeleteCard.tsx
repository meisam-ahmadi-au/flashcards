import React, { SyntheticEvent } from 'react';
import Api from '../../api/Api';
import { IDeleteCard } from '../../util/interfaces';
import Spinner from '../Spinner/Spinner';
import Styles from './DeleteCard.module.scss';

const DeleteCard: React.FC<IDeleteCard> = ({ category, cardId, onCancel }) => {
  const [hasSpinner, setHasSpinner] = React.useState(false);

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const deleteHandler = async () => {
    setHasSpinner(true);
    await Api.deleteCard(category!, cardId!);
    setHasSpinner(false);
    // history.push('/');
    onCancel();
  };

  return (
    <div className={Styles['delete-card']} onClick={stopPropagation}>
      <h3 className={Styles['delete-card__title']}>
        Are you sure you want to delete this card?
      </h3>
      <button className={Styles['delete-card__no']}>No</button>
      <button className={Styles['delete-card__yes']} onClick={deleteHandler}>
        Yes
      </button>
      {hasSpinner ? (
        <div className={Styles['delete-card__spinner']}>
          <Spinner style="absolute" />
        </div>
      ) : null}
    </div>
  );
};

export default DeleteCard;
