import { Dispatch } from 'react';
import Api from '../../api/Api';
import { IAction } from '../reducers/categoriesReducers';
import { IReduxStates } from './../reducers/states';
import { Actions } from './actionTypes';

export const getAllCategories = () => async (
  dispatch: Dispatch<any>,
  getState: () => IReduxStates
) => {
  dispatch(Actions.loading());
  const categories = await Api.getAllCategories(getState().auth.user.uid);
  if (categories) {
    dispatch(Actions.setCategories(categories));
  }
  dispatch(Actions.loaded());
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
  dispatch(Actions.loading());
  await Api.addCategory(category).catch(console.log);
  dispatch(Actions.unsetCategory());
  dispatch(Actions.loaded());
  dispatch(getAllCategories());
};

export const getCategoryByCategoryName = (categoryName: string) => async (
  dispatch: Dispatch<any>,
  getState: () => IReduxStates
) => {
  const { uid } = getState().auth.user;
  dispatch(Actions.loading());
  dispatch(getAllCategories());
};
