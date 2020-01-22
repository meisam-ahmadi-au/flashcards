import actionTypes from '../actions/actionTypes';
import { updateState } from './reducerHelper';
import { ICategoriesState } from './states';
export interface IAction {
  type: string;
  payload?: ICategoriesState;
}

const initialState: ICategoriesState = {
  categories: []
};

const reducer = (state = initialState, action: IAction) => {
  if (action.type === actionTypes.SET_CATEGORIES) {
    return updateState(state, { categories: action.payload?.categories });
  }
  return state;
};

export default reducer;
