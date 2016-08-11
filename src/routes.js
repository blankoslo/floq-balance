import React from 'react';
import { IndexRoute, Route } from 'react-router';

import AppContainer from './containers/app';
import IndexComponent from './components/index';

export default (
  <Route path='/balance' component={AppContainer}>/>
    <IndexRoute component={IndexComponent} />
  </Route>
);
