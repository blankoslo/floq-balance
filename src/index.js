import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import apiMiddleware from './middleware/api';
import routes from './routes';
import _reducers from './reducers';

require('../styles/main.less');

// needed for material-ui, for now
injectTapEventPlugin();

const reducers = combineReducers({
  ..._reducers,
  routing: routerReducer
});

const createStoreWithMiddleware = compose(
  applyMiddleware(apiMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducers);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('app'));
