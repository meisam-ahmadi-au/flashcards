import { User } from 'firebase';
import { ICategory } from './../../util/interfaces';
import { getAllCategories } from './categoriesActions';

const ActionTypes = {
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_USER: 'SET_USER',
  GET_USER_DATA: 'GET_USER_DATA',
  SIGN_OUT: 'SIGN_OUT'
};

export default ActionTypes;

export const ActionCreators = {
  setUser: (user: User) => ({ type: ActionTypes.SET_USER, payload: { user } }),
  unsetUser: () => ({ type: ActionTypes.SET_USER, payload: { user: null } }),
  getCategories: (categories: ICategory[]) => ({
    type: ActionTypes.SET_CATEGORIES,
    payload: { categories }
  })
};
