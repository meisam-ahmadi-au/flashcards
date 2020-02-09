import React from 'react';
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

const Card: React.FC<IReviewCard> = props => {
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

  const [frontText, backText] = shouldReadFront ? [front, back] : [back, front];
  return (
    <div className={styles.card}>
      <div className={styles.card__content}>
        <div className={frontClasses}>
          <h4>{frontText}</h4>
          <div>
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
          <div>
            <TextToSpeech text={backText} />
            <MeriamWebsterPronunciation text={backText} />
          </div>
        </div>
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
