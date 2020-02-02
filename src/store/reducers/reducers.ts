import { combineReducers } from 'redux';
import authReducers from './authReducers';
import cardsReducer from './cardsReducers';
import categoriesReducers from './categoriesReducers';
import generalReducers from './generalReducers';

export default combineReducers({
  auth: authReducers,
  categories: categoriesReducers,
  general: generalReducers,
  cards: cardsReducer
});
