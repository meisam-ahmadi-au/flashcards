import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoriesReducers from './categoriesReducers';

export default combineReducers({
  auth: authReducer,
  categories: categoriesReducers
});
