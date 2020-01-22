import { User } from 'firebase';
import { ICategory } from '../../util/interfaces';

export interface IAuthState {
  user: User;
}

export interface ICategoriesState {
  categories?: ICategory[];
}
export interface IAllStates extends ICategoriesState, IAuthState {}
export interface IReduxStates {
  categories: ICategoriesState;
  auth: IAuthState;
}
