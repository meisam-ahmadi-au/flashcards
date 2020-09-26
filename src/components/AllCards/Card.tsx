import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '../../store/actions/actionTypes';
import { DialogueType } from '../../store/reducers/generalReducers';
import { ICard } from '../../util/interfaces';
import SvgIcons from '../SvgIcons/SvgIcons';
import Styles from './Card.module.scss';

const Card: React.FC<ICard> = props => {
  const dispatch = useDispatch();
  const showDialogue = (a: DialogueType, card: ICard) => () => {
    dispatch(Actions.setCard(card));
    dispatch(Actions.showDialogue(a));
  };

  return (
    <div className={Styles.card}>
      <h4 className={Styles.card__side}>{props.front}</h4>
      <h4 className={Styles.card__side}>{props.back}</h4>
      <p className={Styles.card__nextRead}>
        {moment(props.nextReadTime).format('DD-MMM')}
      </p>
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
