import { User } from 'firebase';
import { DialogueType } from '../reducers/generalReducers';
import { ICard, ICategory } from './../../util/interfaces';

const ActionTypes = {
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_CARDS: 'SET_CARDS',
  SET_CARD: 'SET_CARD',
  SET_USER: 'SET_USER',
  GET_USER_DATA: 'GET_USER_DATA',
  SIGN_OUT: 'SIGN_OUT',
  IS_LOADING: 'IS_LOADING',
  SHOW_DIALOGUE: 'SHOW_DIALOGUE',
  HAS_ERROR: 'HAS_ERROR'
};

export default ActionTypes;

export const Actions = {
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
  unsetCategories: () => ({
    type: ActionTypes.SET_CATEGORIES,
    payload: null
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
  unsetCard: () => ({
    type: ActionTypes.SET_CARD,
    payload: { card: null }
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
  }),
  hasError: () => ({
    type: ActionTypes.HAS_ERROR,
    payload: { hasError: true }
  }),
  hasNoError: () => ({
    type: ActionTypes.HAS_ERROR,
    payload: { hasError: false }
  }),
  showDialogue: (showDialogue: DialogueType) => ({
    type: ActionTypes.SHOW_DIALOGUE,
    payload: { showDialogue }
  }),
  cancelDialogue: () => ({
    type: ActionTypes.SHOW_DIALOGUE,
    payload: { showDialogue: null }
  })
};
