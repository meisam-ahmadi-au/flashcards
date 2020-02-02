import actionTypes from '../actions/actionTypes';
import { updateState } from '../reduxHelpers';
import { ICategoriesState } from './states';
export interface IAction {
  type: string;
  payload: Partial<ICategoriesState>;
}

const initialState: ICategoriesState = {
  categories: [],
  category: ''
};

const categoriesReducers = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return updateState(state, { categories: action.payload?.categories });
    case actionTypes.SET_CATEGORY:
      return updateState(state, { category: action.payload?.category });
    default:
      return state;
  }
};

export default categoriesReducers;
