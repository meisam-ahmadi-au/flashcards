import { Dispatch } from 'react';
import Api from '../../api/Api';
import { IReduxStates } from './../reducers/states';
import { Actions } from './actionTypes';
import { ThunkAction } from 'redux-thunk';

type Action = { type: string; payload?: any };

type ThunkDispatchPromise = (
  a?: any
) => ThunkAction<Promise<any>, IReduxStates, {}, Action>;

export const getAllCategories: ThunkDispatchPromise = (
  refresh = false
) => async (dispatch, getState) => {
  const { categories } = getState().categories;

  if (categories.length === 0 || refresh) {
    dispatch(Actions.loading());
    const categories = await Api.getAllCategories();
    if (categories) {
      dispatch(Actions.setCategories(categories));
    }
    dispatch(Actions.loaded());
  }

  return Promise.resolve();
};

export const deleteCategoryAndUpdate: ThunkDispatchPromise = (
  category: string
) => async (dispatch, getState) => {
  dispatch(Actions.loading());
  await Api.deleteCategory(category);
  await dispatch(getAllCategories(true));
  dispatch(Actions.loaded());
};

export const addCategoryAndUpdate = (category: string) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(Actions.loading());
  await Api.addCategory(category).catch(console.log);
  await dispatch(getAllCategories(true));
  dispatch(Actions.loaded());

  return Promise.resolve();
};

export const getCategoryByCategoryName: ThunkDispatchPromise = (
  categoryName: string
) => async dispatch => {
  dispatch(Actions.loading());
  dispatch(getAllCategories());
};

export const updateCategoryThunk: ThunkDispatchPromise = (
  newCategoryName: string
) => async (dispatch, getState) => {
  const { category, categories } = getState().categories;
  dispatch(Actions.loading());
  await Api.updateCategory(category)(newCategoryName);
  dispatch(Actions.cancelDialogue());
  const newCategories = categories.map(cat => {
    if (cat.category.trim().toLowerCase() === category.trim().toLowerCase()) {
      cat.category = newCategoryName.trim();
    }
    return cat;
  });

  dispatch(Actions.setCategories(newCategories));
  dispatch(Actions.loaded());
};
