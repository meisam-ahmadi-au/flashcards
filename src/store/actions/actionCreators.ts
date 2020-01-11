import { Dispatch } from 'react';
import Api from '../../api/Api';
import { IAction } from '../reducers/reducers';

export const getAllCategories = (uid: string) => async (
  dispatch: Dispatch<IAction>
) => {
  const categories = await Api.getAllCategories(uid);
  dispatch({ type: 'GET_ALL_CARDS_IN_CATEGORY', payload: { categories } });
};
