import React from 'react';
import { useDispatch } from 'react-redux';
import flashcardImageSrc from '../../assets/flashcard.png';
import classNames from '../../util/classNames';
import { IReviewCard } from '../../util/interfaces';
import {
  allIntervalsForDifferentQuality,
  IIntervalDeatilsWithQuality
} from '../../util/superMemoII';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import styles from './ReviewCard.module.scss';
import MeriamWebsterPronunciation from '../TextToSpeech/MeriamWebsterPronunciation';
import UpdateCard from '../AllCards/UpdateCard';
import { Actions } from '../../store/actions/actionTypes';
import { Modal } from '../Portal/Portal';

const ReviewCard: React.FC<IReviewCard> = props => {
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
  const [showUpdate, setShowUpdate] = React.useState(false);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(Actions.setCard(props));
    setShowUpdate(true);
  };

  const updateCardInterval = (a: IIntervalDeatilsWithQuality) => () => {
    debugger;
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

  const [frontText, backText] = shouldReadFront ? [front, back] : [back, front];
  return (
    <div className={styles.card}>
      <div className={styles.card__content}>
        <div className={frontClasses}>
          <h4>{frontText}</h4>
          <div className={styles.card__options}>
            <TextToSpeech text={frontText} />
            <MeriamWebsterPronunciation text={frontText} />
          </div>
        </div>
        <div className={styles['card__image--container']}>
          <img
            className={styles.card__image}
            src={flashcardImageSrc}
            alt="awesome flashcards"
          />
        </div>
        <div className={backClasses}>
          <h4>{backText}</h4>
          <div className={styles.card__options}>
            <TextToSpeech text={backText} />
            <MeriamWebsterPronunciation text={backText} />
          </div>
        </div>
      </div>

      <button
        className={styles.card__toggle}
        onClick={() => setShowBack(s => !s)}
        type="button"
      >
        {!showBack ? 'Show' : 'Hide'}
      </button>
      <div
        className={classNames(
          styles['card__buttons--container'],
          showBack ? '' : styles.hidden
        )}
      >
        <button
          data-content="Easy"
          className={styles.card__button}
          onClick={updateCardInterval(easy)}
          type="button"
        >
          <span>{`${easy.interval} day(s)`}</span>
        </button>

        <button
          data-content="Good"
          className={styles.card__button}
          onClick={updateCardInterval(good)}
          type="button"
        >
          <span>{`${good.interval} day(s)`}</span>
        </button>

        <button
          data-content="Hard"
          className={styles.card__button}
          onClick={updateCardInterval(hard)}
          type="button"
        >
          <span>{`${hard.interval} day(s)`}</span>
        </button>

        <button
          data-content="Insane"
          className={styles.card__button}
          onClick={updateCardInterval(impossible)}
          type="button"
        >
          <span>again</span>
        </button>
        <button
          className={styles.card__update}
          onClick={onUpdate}
          type="button"
        >
          Edit Card Content
        </button>
      </div>
      {showUpdate && (
        <Modal onClick={() => setShowUpdate(false)}>
          <UpdateCard onCancel={() => setShowUpdate(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ReviewCard;
