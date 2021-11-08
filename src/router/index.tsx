import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "screens/Login";
import ForgotPassword from "screens/ForgotPassword";
import Transactions from "screens/Transactions";
import Home from "screens/Home";
import Check from "screens/Check";
import AuthenticateRoute from "./AuthenticateRoute";
import Graph from "screens/Graph";
import Page404 from "screens/Page404";
import Nav from "components/Nav";
import RequestDone from "screens/RequestDone";
import ChangePassword from "screens/ChangePassword";
import { DateSelectProvider } from "utils/context";
import { CategoryProvider } from "utils/CategoryContext";

function AppRouter() {
  useEffect(() => {
    if (typeof window.ResizeObserver === "undefined") {
      window.ResizeObserver = require("resize-observer-polyfill").default;
    }
  }, []);

  return (
    <Router basename="/app">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/send-mail-done" component={RequestDone} />
        <Route exact path="/change-password" component={ChangePassword} />
        <CategoryProvider>
          <Nav />
          <AuthenticateRoute exact path="/" component={Home} />
          <AuthenticateRoute
            exact
            path="/transactions"
            component={Transactions}
          />
          <AuthenticateRoute exact path="/graph" component={Graph} />
        </CategoryProvider>
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
