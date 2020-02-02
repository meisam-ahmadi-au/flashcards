import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IIntervalDeatilsWithQuality } from '../../util/superMemoII';
import ReviewCard from './ReviewCard';
import { useParams } from 'react-router-dom';
import { useReduxSelector } from '../../store/reduxHelpers';
import { ICard } from '../../util/interfaces';
import {
  retreiveTodaysCardsThunks,
  updateReviewedCardThunk
} from '../../store/actions/cardsActions';
import { ThunkDispatch } from 'redux-thunk';
import { IReduxStates } from '../../store/reducers/states';
import { Action } from 'redux';

const Cards: React.FC = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    IReduxStates,
    {},
    Action<any>
  >;
  const { category } = useParams();
  const { cards } = useReduxSelector().cards;
  const [activeCard, setActiveCard] = useState();
  const [cardsToReview, setCardsToReview] = useState([] as ICard[]);

  useEffect(() => {
    if (category) {
      dispatch(retreiveTodaysCardsThunks(category));
    }
  }, [category, dispatch]);

  useEffect(() => {
    setActiveCard(cardsToReview[0]);
  }, [cardsToReview, cardsToReview.length]);

  useEffect(() => {
    setCardsToReview(cards);
  }, [cards]);

  const updateCardInterval = async ({
    repetitions,
    quality,
    easeFactor,
    interval
  }: IIntervalDeatilsWithQuality) => {
    const nextReadTime = moment()
      .add(interval, 'days')
      .valueOf();

    let { learningCurve } = activeCard;
    if (!Array.isArray(learningCurve)) {
      learningCurve = [activeCard.createdAt];
    }
    learningCurve = [...learningCurve, activeCard.nextReadTime];

    const activeCardUpdated = {
      ...activeCard,
      shouldReadFront: !activeCard.shouldReadFront,
      learningCurve,
      nextReadTime,
      interval,
      easeFactor,
      repetitions
    };

    const newCardsToReview = [...cardsToReview];
    // if impossible
    if (quality === 0) {
      newCardsToReview.push(activeCardUpdated);
    }

    await dispatch(updateReviewedCardThunk(activeCardUpdated));
    // ignoring first element and getting the rest
    const [, ...restOfCards] = newCardsToReview;
    setCardsToReview(restOfCards);
    setActiveCard(restOfCards[0]);
  };

  return (
    <div>
      {cardsToReview.length ? (
        <ReviewCard {...activeCard} updateCard={updateCardInterval} />
      ) : (
        <h4>All reviewed! Well done!</h4>
      )}
    </div>
  );
};

export default Cards;
