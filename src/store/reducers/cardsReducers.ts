import actionTypes from '../actions/actionTypes';
import { updateState } from '../reduxHelpers';
import { ICard } from './../../util/interfaces';
export interface ICardsAction {
  type: string;
  payload?: ICardsState;
}

export interface ICardsState {
  searchTerms: string;
  cards: ICard[];
  card: ICard;
}

const initialState: ICardsState = {
  searchTerms: '',
  cards: [] as ICard[],
  card: {} as ICard
};

const cardsReducer = (state = initialState, action: ICardsAction) => {
  switch (action.type) {
    case actionTypes.SET_CARDS:
    case actionTypes.SET_CARD:
      return updateState(state, action.payload);
    default:
      return state;
  }
};

export default cardsReducer;
