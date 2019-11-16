import React from 'react';
import { ICard } from '../../util/interfaces';
import { Modal } from '../Portal/Portal';
import SvgIcons from '../SvgIcons/SvgIcons';
import Styles from './Card.module.scss';
import DeleteCard from './DeleteCard';
import UpdateCard from './UpdateCard';

const Card: React.FC<ICard> = ({
  front,
  back,
  cardId,
  category,
  deleteCard,
  categoryId,
  updateCard
}) => {
  const [showPortal, setShowPortal] = React.useState('');
  const cancelModal = () => setShowPortal('');
  return (
    <div className={Styles.card}>
      {showPortal === 'delete' ? (
        <Modal onClick={cancelModal}>
          <DeleteCard
            cardId={cardId!}
            category={category!}
            onCancel={cancelModal}
            deleteCard={deleteCard}
          />
        </Modal>
      ) : showPortal === 'update' ? (
        <Modal onClick={cancelModal}>
          <UpdateCard
            onCancel={cancelModal}
            front={front}
            back={back}
            cardId={cardId!}
            category={category!}
            categoryId={categoryId}
            updateCard={updateCard}
          />
        </Modal>
      ) : showPortal === 'move' ? (
        <Modal onClick={cancelModal}>move</Modal>
      ) : /* default*/ null}
      <h4 className={Styles.card__side}>{front}</h4>
      <h4 className={Styles.card__side}>{back}</h4>
      <div className={Styles.card__tools}>
        <SvgIcons
          className={Styles.card__svg}
          iconId="delete"
          strokeWidth="0"
          title="delete"
          onClick={() => setShowPortal('delete')}
        />

        <SvgIcons
          className={Styles.card__svg}
          iconId="move"
          title="move"
          onClick={() => setShowPortal('move')}
        />

        <SvgIcons
          className={Styles.card__svg}
          iconId="edit"
          strokeWidth="0"
          title="edit"
          onClick={() => setShowPortal('update')}
        />
      </div>
    </div>
  );
};

export default Card;
