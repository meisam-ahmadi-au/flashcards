import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IIntervalDeatilsWithQuality } from '../../util/superMemoII';
import ReviewCard from './ReviewCard';
import { useReduxSelector } from '../../store/reduxHelpers';
import { ICard } from '../../util/interfaces';
import {
  retreiveTodaysCardsThunks,
  updateReviewedCardThunk
} from '../../store/actions/cardsActions';
import { IReduxStates } from '../../store/reducers/states';

const Cards: React.FC = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    IReduxStates,
    {},
    Action<any>
  >;
  const { category } = useParams<{ category: string }>();
  const { cards } = useReduxSelector().cards;
  const categoryIdInRedux = useReduxSelector().categories.categories.find(
    c => c.category === category
  )?.categoryId;
  const [activeCard, setActiveCard] = useState<ICard>();
  const [cardsToReview, setCardsToReview] = useState([] as ICard[]);

  useEffect(() => {
    if (category) {
      dispatch(retreiveTodaysCardsThunks(category));
    }
  }, [category, dispatch]);

  useEffect(() => {
    const cardsWithCategoryId = cards.map(card => {
      return !card.categoryId
        ? { ...card, categoryId: String(categoryIdInRedux) }
        : card;
    });
    setCardsToReview(cardsWithCategoryId);
    setActiveCard(cardsWithCategoryId[0]);
  }, [cards, categoryIdInRedux]);

  const updateCardInterval = async ({
    repetitions,
    quality,
    easeFactor,
    interval
  }: IIntervalDeatilsWithQuality) => {
    if (!activeCard) {
      return;
    }
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

    let [, ...newCardsToReview] = cardsToReview;
    console.log({ quality });
    // if impossible
    if (quality === 0) {
      newCardsToReview = [...newCardsToReview, activeCardUpdated];
    }

    dispatch(updateReviewedCardThunk(activeCardUpdated));
    // ignoring first element and getting the rest
    console.log({ newCardsToReview });
    setCardsToReview(newCardsToReview);
    setActiveCard(newCardsToReview[0]);
  };

  return (
    <div>
      {activeCard && cardsToReview.length ? (
        <ReviewCard {...activeCard} updateCard={updateCardInterval} />
      ) : (
        <h4>All reviewed! Well done!</h4>
      )}
    </div>
  );
};

export default Cards;
