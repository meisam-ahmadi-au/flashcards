import React from 'react';
import flashcardImageSrc from '../../assets/flashcard.png';
import classNames from '../../util/classNames';
import { ICard } from '../../util/interfaces';
import {
  allIntervalsForDifferentQuality,
  IIntervalDeatilsWithQuality
} from '../../util/superMemoII';
import styles from './Card.module.scss';

interface ICardProps extends ICard {
  updateCard: (a: IIntervalDeatilsWithQuality) => void;
}

const Card: React.FC<ICardProps> = props => {
  const {
    repetitions,
    interval,
    easeFactor,
    front,
    back,
    shouldReadFront,
    updateCard
  } = props;

  const [showBack, setShowBack] = React.useState(false);

  const updateCardInterval = (a: IIntervalDeatilsWithQuality) => () => {
    if (!showBack) {
      return false;
    }
    setShowBack(false);
    updateCard(a);
  };

  const { easy, good, hard, impossible } = allIntervalsForDifferentQuality(
    repetitions,
    interval,
    easeFactor
  );

  const frontClasses = classNames(styles.card__side, styles.card__front);
  const backClasses = classNames(
    styles.card__side,
    styles.card__back,
    showBack ? ' ' : styles.hidden
  );

  return (
    <div className={styles.card}>
      <div className={styles.card__content}>
        <h4 className={frontClasses}>{shouldReadFront ? front : back}</h4>
        <div className={styles['card__image--container']}>
          <img
            className={styles.card__image}
            src={flashcardImageSrc}
            alt="awesome flashcards"
          />
        </div>
        <h4 className={backClasses}>{shouldReadFront ? back : front}</h4>
      </div>

      <button
        className={styles.card__toggle}
        onClick={() => setShowBack(!showBack)}
      >
        Show
      </button>
      <div
        className={classNames(
          styles['card__buttons--container'],
          showBack ? '' : styles.hidden
        )}
      >
        <button
          data-content="Easy"
          className={classNames(styles.card__button, styles.easy)}
          onClick={updateCardInterval(easy)}
        >
          <span>{`${easy.interval} day(s)`}</span>
        </button>

        <button
          data-content="Good"
          className={classNames(styles.card__button, styles.good)}
          onClick={updateCardInterval(good)}
        >
          <span>{`${good.interval} day(s)`}</span>
        </button>

        <button
          data-content="Hard"
          className={classNames(styles.card__button, styles.hard)}
          onClick={updateCardInterval(hard)}
        >
          <span>{`${hard.interval} day(s)`}</span>
        </button>

        <button
          data-content="Insane"
          className={classNames(styles.card__button, styles.Insane)}
          onClick={updateCardInterval(impossible)}
        >
          <span>again</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
