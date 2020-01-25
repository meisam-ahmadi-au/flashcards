import actionTypes from '../actions/actionTypes';
import { updateState } from '../reduxHelpers';
export interface IGeneralAction {
  type: string;
  payload?: IGeneralState;
}

export interface IGeneralState {
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IGeneralState = {
  isLoading: false,
  hasError: false
};

const generalReducer = (state = initialState, action: IGeneralAction) => {
  if (action.type === actionTypes.IS_LOADING) {
    return updateState(state, { isLoading: action.payload?.isLoading });
  }
  return state;
};

export default generalReducer;
