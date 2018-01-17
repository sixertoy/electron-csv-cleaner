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
  case 'onFileUploading':
    return state.concat(action.files);
  default:
    return state;
  }
};

const selections = (state = [], action) => {
  switch (action.type) {
  case 'onSelectFile':
    return (state.indexOf(action.name) !== -1)
      ? state.filter(val => (val !== action.name))
      : state.concat([action.name]);
  default:
    return state;
  }
};

export const reducers = combineReducers({
  files,
  loading,
  selections,
  // !!! always last
  router: routerReducer
});

export default reducers;
