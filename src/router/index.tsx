import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "screens/Login";
import ForgotPassword from "screens/ForgotPassword";
import Transactions from "screens/Transactions";
import Home from "screens/Home/Home";
import AuthenticateRoute from "./AuthenticateRoute";

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
      </Switch>
    </Router>
  );
}

export default AppRouter;
