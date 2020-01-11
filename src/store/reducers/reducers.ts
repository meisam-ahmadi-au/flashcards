import { ICategory } from './../../util/interfaces';
export interface IAction {
  type: string;
  payload?: IState;
}

const initialState: IState = {
  categories: []
};

interface IState {
  categories?: ICategory[];
}

const reducer = (state = initialState, action: IAction) => {
  if (action.type === 'GET_ALL_CARDS_IN_CATEGORY') {
    return updateState(state, { categories: action.payload?.categories });
  }
  return state;
};

export default reducer;
const updateState = (oldStates: IState, updatedValue: IState): IState => ({
  ...oldStates,
  ...updatedValue
});
