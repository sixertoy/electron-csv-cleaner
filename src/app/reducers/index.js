import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const files = (state = false, action) => {
  switch (action.type) {
  case 'onUploadFiles':
    return [].concat(action.files);
  default:
    return state;
  }
};

export const reducers = combineReducers({
  files,
  // !!! always last
  router: routerReducer
});

export default reducers;
