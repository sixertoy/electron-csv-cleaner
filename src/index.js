import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHashHistory from 'history/createHashHistory';

// application
import './index.css';
import { configure } from './app/store';
import DropScreen from './app/DropScreen';
import ConvertScreen from './app/ConvertScreen';
import registerServiceWorker from './registerServiceWorker';

// application
const history = createHashHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="main-container">
        <Route exact path="/" component={DropScreen} />
        <Route exact path="/convert" component={ConvertScreen} />
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
