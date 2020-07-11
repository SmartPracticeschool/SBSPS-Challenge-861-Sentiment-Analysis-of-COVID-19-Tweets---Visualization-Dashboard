import React from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

// importing routes
import Home from "./containers/Home.js";
import Dashboard from "./containers/Dashboard.js";
import Team from "./containers/Team.js";
import ErrorPage from "./containers/ErrorPage.js";

const App = () => {
  let history = useHistory();

  return (
    <BrowserRouter history={history}>
      {/* routes */}
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
        <Route path="/team" render={(props) => <Team {...props} />} />
        <Route path="*" render={(props) => <ErrorPage {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
