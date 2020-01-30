import { Dispatch } from 'redux';
import Api from '../../api/Api';
import { ICardSides } from './../../util/interfaces';
import { IReduxStates } from './../reducers/states';
import { Actions } from './actionTypes';

export const getAllCardsInCategory = (category: string) => async (
  dispatch: Dispatch<any>,
  getState: () => IReduxStates
) => {
  const user = getState().auth.user;
  dispatch(Actions.loading());
  const cards = await Api.getAllCardsInCategory(user.uid, category);
  dispatch(Actions.setCards(cards));
  dispatch(Actions.loaded());
};

export const deleteCard = () => async (
  dispatch: Dispatch<any>,
  getState: () => IReduxStates
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

export const updateCardThunk = (updatedCard: ICardSides) => async (
  dispatch: Dispatch<any>,
  getState: () => IReduxStates
) => {
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

export const addCardThunk = (
  categoryId: number,
  { front, back }: ICardSides
) => async (dispatch: Dispatch<any>, getState: () => IReduxStates) => {
  dispatch(Actions.loading());
  const { uid } = getState().auth.user;
  const createdAt = Date.now();
  const newCard = {
    front,
    back,
    createdAt,
    nextReadTime: createdAt,
    shouldReadFront: true,
    learningCurve: [createdAt]
  };
  await Api.addCard(uid, categoryId)(newCard).catch(console.log);
  dispatch(Actions.loaded());
};
