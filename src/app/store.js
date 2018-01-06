/* global window */
/* eslint
  no-console: 0,
  no-underscore-dangle: 0 */
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';

// application
import { reducers } from './reducers';


/**
 * Il est important d'encapsuler la creation des stores
 * dans une function pour les tests unitaires
 */
export const configure = (history) => {
  const middleware = routerMiddleware(history);
  // charge les states existants dans le localStorage
  const store = createStore(
    reducers,
    applyMiddleware(middleware)
  );
  return store;
};

export default configure;
