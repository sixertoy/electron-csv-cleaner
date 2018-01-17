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
  case 'onFileDeleted':
    return state.filter(obj => (obj.id !== action.fileid));
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

// redux-persist whitelist
export const whitelist = [
  'files'
];

export const reducers = combineReducers({
  files,
  error,
  loading,
  // !!! always last
  router: routerReducer
});
