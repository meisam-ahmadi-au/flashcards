import { User } from 'firebase';
import { ICategory } from '../../util/interfaces';
import { ICardsState } from './cardsReducers';
import { IGeneralState } from './generalReducers';

export interface IAuthState {
  user: User;
}

export interface ICategoriesState {
  categories: ICategory[];
  category: string;
}
export interface IAllStates extends ICategoriesState, IAuthState, ICardsState {}
export interface IReduxStates {
  categories: ICategoriesState;
  auth: IAuthState;
  general: IGeneralState;
  cards: ICardsState;
}
