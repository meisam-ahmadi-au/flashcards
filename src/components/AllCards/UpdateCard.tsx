import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../store/actions/actionTypes';
import { updateCardThunk } from '../../store/actions/cardsActions';
import { IReduxStates } from '../../store/reducers/states';
import { ICardSides } from '../../util/interfaces';
import CardInputForm from '../AddCard/CardInputForm';

const UpdateCard: React.FC = () => {
  const dispatch = useDispatch();
  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();
  const { front, back } = useSelector((s: IReduxStates) => s.cards.card);

  const submitHandler = (card: ICardSides) => dispatch(updateCardThunk(card));
  const cancelDialogue = () => dispatch(Actions.cancelDialogue());

  return (
    <div style={style} onClick={stopPropagation}>
      <CardInputForm
        front={front}
        back={back}
        submitHandler={submitHandler}
        onCancel={cancelDialogue}
      />
    </div>
  );
};

export default UpdateCard;

const style = {
  padding: '20px',
  width: '70vw',
  background: '#FCFAF2',
  position: 'relative' as 'relative'
};
