import { Dispatch } from 'redux';
import Api from '../../api/Api';
import { IReduxStates } from './../reducers/states';
import { ActionCreators } from './actionTypes';

export const getAllCardsInCategory = (category: string) => async (
  dispatch: Dispatch<any>,
  getState: () => IReduxStates
) => {
  const user = getState().auth.user;
  dispatch(ActionCreators.loading());
  const cards = await Api.getAllCardsInCategory(user.uid, category);
  dispatch(ActionCreators.setCards(cards));
  dispatch(ActionCreators.loaded());
};
