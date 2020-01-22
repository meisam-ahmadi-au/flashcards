import { Dispatch } from 'react';
import Api from '../../api/Api';
import { IAction } from '../reducers/categoriesReducers';
import { IAllStates } from '../reducers/states';
import { ActionCreators } from './actionTypes';

export const getAllCategories = () => async (
  dispatch: Dispatch<IAction>,
  getState: () => IAllStates
) => {
  const categories = await Api.getAllCategories(getState().user.uid);
  if (categories) {
    dispatch(ActionCreators.getCategories(categories));
  }
};
