import React from "react";
import { IndexRoute, Route } from "react-router";

import AppContainer from "./containers/app";

export default (
  <Route path="/balance" component={AppContainer}>
    />
    <IndexRoute component={AppContainer} />
  </Route>
);
