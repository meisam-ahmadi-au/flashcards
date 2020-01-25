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
  if (action.type === actionTypes.SET_CARDS) {
    return updateState(state, { cards: action.payload?.cards });
  }
  return state;
};

export default cardsReducer;
