import actionTypes from '../actions/actionTypes';
import { updateState } from '../reduxHelpers';
export interface IGeneralAction {
  type: string;
  payload?: IGeneralState;
}

export interface IGeneralState {
  showDialogue: DialogueType | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IGeneralState = {
  showDialogue: null,
  isLoading: false,
  hasError: false
};

export enum DialogueType {
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  MOVE = 'MOVE'
}

const generalReducer = (state = initialState, action: IGeneralAction) => {
  switch (action.type) {
    case actionTypes.IS_LOADING:
    case actionTypes.SHOW_DIALOGUE:
      return updateState(state, action.payload);
    default:
      return state;
  }
};

export default generalReducer;
