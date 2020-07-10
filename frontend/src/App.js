import React from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

// importing routes
import Home from "./containers/Home.js";
import Dashboard from "./containers/Dashboard.js";
import About from "./containers/About.js";

const App = () => {
  let history = useHistory();

  return (
    <BrowserRouter history={history}>
      {/* routes */}
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
        <Route path="/about" render={(props) => <About {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
