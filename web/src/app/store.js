import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';


// application
import { reducers, whitelist } from './reducers';

export const configure = (history) => {
  const routing = routerMiddleware(history);
  const store = createStore(
    persistReducer({
      storage,
      whitelist,
      key: 'iziges.csvcleaner'
    }, reducers),
    compose(applyMiddleware(thunk, routing))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configure;
