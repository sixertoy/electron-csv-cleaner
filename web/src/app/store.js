import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

// application
import { reducers } from './reducers';

export const configure = (history) => {
  const routing = routerMiddleware(history);
  const store = createStore(
    reducers,
    compose(applyMiddleware(thunk, routing))
  );
  return store;
};

export default configure;
