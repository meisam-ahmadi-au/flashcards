import Api from '../../api/Api';
import { ICardSides, IUpdateCard } from './../../util/interfaces';
import { IReduxStates } from './../reducers/states';
import { Actions } from './actionTypes';
import { getAllCategories } from './categoriesActions';
import { ThunkAction } from 'redux-thunk';

type Action = { type: string; payload?: any };

type ThunkDispatchPromise = (
  ...a: any
) => ThunkAction<Promise<any>, IReduxStates, {}, Action>;

export const getAllCardsInCategory: ThunkDispatchPromise = (
  category: string
) => async (dispatch, getState) => {
  const user = getState().auth.user;
  dispatch(Actions.loading());
  const cards = await Api.getAllCardsInCategory(user.uid, category);
  dispatch(Actions.setCards(cards));
  dispatch(Actions.loaded());
};

export const deleteCard: ThunkDispatchPromise = () => async (
  dispatch,
  getState
) => {
  const { cardId, category } = getState().cards.card;
  dispatch(Actions.loading());
  await Api.deleteCard(category!, cardId);
  const filteredCards = getState().cards.cards.filter(
    card => card.cardId !== cardId
  );
  dispatch(Actions.setCards(filteredCards));
  dispatch(Actions.cancelDialogue());
  dispatch(Actions.loaded());
  dispatch(Actions.unsetCard());
};

export const updateCardThunks: ThunkDispatchPromise = (
  updatedCard: ICardSides
) => async (dispatch, getState) => {
  dispatch(Actions.loading());
  const { user } = getState().auth;
  const { categoryId, front, back, cardId } = getState().cards.card;
  if (front === updatedCard.front && back === updatedCard.back) {
    return dispatch(Actions.cancelDialogue());
  }
  await Api.updateCard(user.uid, categoryId)({ ...updatedCard, cardId });
  const newCards = getState().cards.cards.map(card => {
    if (card.cardId === cardId) {
      return {
        ...card,
        ...updatedCard
      };
    } else {
      return card;
    }
  });
  dispatch(Actions.setCards(newCards));
  dispatch(Actions.cancelDialogue());
  dispatch(Actions.loaded());
  dispatch(Actions.unsetCard());
};

export const addCardThunks: ThunkDispatchPromise = (
  categoryId: number,
  card: IUpdateCard
) => async (dispatch, getState) => {
  if (!card.front || !card.back) {
    return;
  }
  dispatch(Actions.loading());
  const { uid } = getState().auth.user;
  const categories = getState().categories.categories.map(cat => {
    if (cat.categoryId === categoryId) {
      cat.totalNumberOfCards++;
    }
    return cat;
  });

  const createdAt = Date.now();
  const newCard = {
    ...card,
    createdAt: card.createdAt ?? createdAt,
    nextReadTime: card.nextReadTime ?? createdAt,
    shouldReadFront: card.shouldReadFront ?? true,
    learningCurve: card.learningCurve ?? [createdAt]
  };
  await Api.addCard(uid, categoryId)(newCard).catch(console.log);
  debugger;
  dispatch(Actions.setCategories(categories));
  dispatch(Actions.loaded());
  return Promise.resolve();
};

export const retreiveTodaysCardsThunks: ThunkDispatchPromise = (
  category: string
) => async (dispatch, getState) => {
  dispatch(Actions.setCategory(category));
  if (!getState().categories.categories.length) {
    await dispatch(getAllCategories());
  }

  const {
    auth: {
      user: { uid }
    },
    categories: { categories }
  } = getState();

  const categoryId = categories.find(cat => cat.category === category)
    ?.categoryId;

  if (categoryId) {
    dispatch(Actions.loading());
    const cards = await Api.retreiveTodaysCardsByCategoryId(categoryId, uid);
    dispatch(Actions.setCards(cards));
    dispatch(Actions.loaded());
  }
};

export const updateReviewedCardThunk: ThunkDispatchPromise = (
  updatedCard: IUpdateCard
) => async (dispatch, getState) => {
  const {
    auth: {
      user: { uid }
    },
    categories: { categories, category }
  } = getState();

  const reviewedCategoryUpdated = categories.map(cat => {
    if (cat.category === category) {
      cat.numberOfUnreviewedCards--;
    }
    return cat;
  });
  dispatch(Actions.setCategories(reviewedCategoryUpdated));

  const reviewedCategory = categories.find(cat => cat.category === category);
  if (reviewedCategory) {
    const { categoryId } = reviewedCategory;
    await Api.updateCard(
      uid,
      categoryId
    )(updatedCard).catch(() => dispatch(Actions.hasError()));
  }

  return Promise.resolve();
};
