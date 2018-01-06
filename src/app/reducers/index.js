import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const reducers = combineReducers({
  // !!! always last
  router: routerReducer
});

export default reducers;
