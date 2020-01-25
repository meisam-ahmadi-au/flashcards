import { User } from 'firebase';
import { ICard, ICategory } from './../../util/interfaces';

const ActionTypes = {
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_CARDS: 'SET_CARDS',
  SET_CARD: 'SET_CARD',
  SET_USER: 'SET_USER',
  GET_USER_DATA: 'GET_USER_DATA',
  SIGN_OUT: 'SIGN_OUT',
  IS_LOADING: 'IS_LOADING'
};

export default ActionTypes;

export const ActionCreators = {
  setUser: (user: User) => ({
    type: ActionTypes.SET_USER,
    payload: { user }
  }),
  unsetUser: () => ({
    type: ActionTypes.SET_USER,
    payload: { user: null }
  }),
  setCategories: (categories: ICategory[]) => ({
    type: ActionTypes.SET_CATEGORIES,
    payload: { categories }
  }),
  setCategory: (category: string) => ({
    type: ActionTypes.SET_CATEGORY,
    payload: { category }
  }),
  setCards: (cards: ICard[]) => ({
    type: ActionTypes.SET_CARDS,
    payload: { cards }
  }),
  setCard: (card: ICard) => ({
    type: ActionTypes.SET_CARD,
    payload: { card }
  }),
  unsetCategory: () => ({
    type: ActionTypes.SET_CATEGORY,
    payload: { category: '' }
  }),
  loading: () => ({
    type: ActionTypes.IS_LOADING,
    payload: { isLoading: true }
  }),
  loaded: () => ({
    type: ActionTypes.IS_LOADING,
    payload: { isLoading: false }
  })
};
