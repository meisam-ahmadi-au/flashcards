import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../store/actions/actionTypes';
import { DialogueType } from '../../store/reducers/generalReducers';
import { IReduxStates } from '../../store/reducers/states';
import { ICard } from '../../util/interfaces';
import { Modal } from '../Portal/Portal';
import SvgIcons from '../SvgIcons/SvgIcons';
import Styles from './Card.module.scss';
import DeleteCard from './DeleteCard';
import UpdateCard from './UpdateCard';

const Card: React.FC<ICard> = props => {
  const dispatch = useDispatch();
  const showConfirmation = useSelector(
    (s: IReduxStates) => s.general.showDialogue
  );
  const cancelDialogue = () => dispatch(Actions.cancelDialogue());
  const showDialogue = (a: DialogueType, card: ICard) => () => {
    dispatch(Actions.setCard(card));
    dispatch(Actions.showDialogue(a));
  };

  const allModals = (portal: string) => {
    switch (portal) {
      case DialogueType.DELETE:
        return <DeleteCard />;
      case DialogueType.UPDATE:
        return <UpdateCard />;
      case DialogueType.MOVE:
        return <h2>Move</h2>;
      default:
        return null;
    }
  };

  return (
    <div className={Styles.card}>
      {showConfirmation && (
        <Modal onClick={cancelDialogue}>{allModals(showConfirmation)}</Modal>
      )}

      <h4 className={Styles.card__side}>{props.front}</h4>
      <h4 className={Styles.card__side}>{props.back}</h4>
      <div className={Styles.card__tools}>
        <SvgIcons
          className={Styles.card__svg}
          iconId="delete"
          strokeWidth="0"
          title="delete"
          onClick={showDialogue(DialogueType.DELETE, props)}
        />

        <SvgIcons
          className={Styles.card__svg}
          iconId="move"
          title="move"
          onClick={showDialogue(DialogueType.MOVE, props)}
        />

        <SvgIcons
          className={Styles.card__svg}
          iconId="edit"
          strokeWidth="0"
          title="edit"
          onClick={showDialogue(DialogueType.UPDATE, props)}
        />
      </div>
    </div>
  );
};

export default Card;
