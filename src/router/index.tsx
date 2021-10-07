import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "screens/Login";
import ForgotPassword from "screens/ForgotPassword";
import Transactions from "screens/Transactions";
import Home from "screens/Home";
import AuthenticateRoute from "./AuthenticateRoute";
import Graph from "screens/Graph";

function AppRouter() {
  useEffect(() => {
    if (typeof window.ResizeObserver === "undefined") {
      window.ResizeObserver = require("resize-observer-polyfill").default;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <AuthenticateRoute
          exact
          path="/transactions"
          component={Transactions}
        />
        <AuthenticateRoute exact path="/" component={Home} />
        <AuthenticateRoute exact path="/graph" component={Graph} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
