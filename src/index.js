import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './index.css';
import { configure } from './app/store';
import MainScreen from './app/MainScreen';
import registerServiceWorker from './registerServiceWorker';

// application
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="main-container">
        <Route exact path="/" component={MainScreen} />
      </div>
    </ConnectedRouter>
  </Provider>
);

const handleDocumentDragNDrop = evt => evt.preventDefault();
document.addEventListener('drop', handleDocumentDragNDrop, false);
document.addEventListener('dragover', handleDocumentDragNDrop, false);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
registerServiceWorker();
