import actionTypes from '../actions/actionTypes';
import { updateState } from './reducerHelper';
import { IAuthState } from './states';
export interface IAuthAction {
  type: string;
  payload?: IAuthState;
}
// #region initial state and helpers
const getUser = () => {
  const localStorageUser = localStorage.getItem('user');
  const user =
    localStorageUser !== 'undefined' && localStorageUser
      ? JSON.parse(localStorageUser)
      : null;
  return user;
};

const initialState: IAuthState = {
  user: getUser()
};
// #endregion

const reducer = (state = initialState, action: IAuthAction) => {
  if (action.type === actionTypes.SET_USER) {
    return updateState(state, { user: action.payload?.user });
  }
  return state;
};

export default reducer;
