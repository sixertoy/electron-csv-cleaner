import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const loading = (state = false, action) => {
  switch (action.type) {
  case 'onLoadingStart':
    return true;
  case 'onLoadingComplete':
    return false;
  default:
    return state;
  }
};

const files = (state = [], action) => {
  switch (action.type) {
  case 'onFileUploaded':
    return state.concat([action.file]);
  default:
    return state;
  }
};

const error = (state = false, action) => {
  switch (action.type) {
  case 'onDiscardError':
    return false;
  case 'onLoadingError':
    return action.message;
  default:
    return state;
  }
};

export const reducers = combineReducers({
  files,
  error,
  loading,
  // !!! always last
  router: routerReducer
});

export default reducers;
