import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';


// application
import './index.css';
import { configure } from './app/store';
import Application from './app/Application';

// application
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <div id="react-container" className="relative flex-columns">
        <Route path="/" component={Application} />
      </div>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
