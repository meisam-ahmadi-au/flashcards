import { Dispatch } from 'react';
import Api from '../../api/Api';
import { IAction } from '../reducers/categoriesReducers';
import { IReduxStates } from './../reducers/states';
import { ActionCreators } from './actionTypes';

export const getAllCategories = () => async (
  dispatch: Dispatch<IAction>,
  getState: () => IReduxStates
) => {
  const categories = await Api.getAllCategories(getState().auth.user.uid);
  if (categories) {
    dispatch(ActionCreators.setCategories(categories));
  }
};

export const deleteCategoryAndUpdate = (category: string) => async (
  dispatch: Dispatch<any>
) => {
  await Api.deleteCategory(category);
  dispatch(getAllCategories());
};

export const addCategoryAndUpdate = (category: string) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(ActionCreators.loading());
  await Api.addCategory(category).catch(console.log);
  dispatch(ActionCreators.unsetCategory());
  dispatch(ActionCreators.loaded());
  dispatch(getAllCategories());
};
