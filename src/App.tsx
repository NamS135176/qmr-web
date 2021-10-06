import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "screens/LoginScreen";
import ForgotPassScreen from "screens/ForgotPassScreen";
import TestScreen from "screens/TestScreen";
import ListPageScreen from "screens/ListPageScreen";
import Home from "screens/Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/graph">
          <p>Hello graph</p>
        </Route>
        <Route path="/forgot_password">
          <ForgotPassScreen />
        </Route>
        <Route path="/test">
          <TestScreen />
        </Route>
        <Route path="/list">
          <ListPageScreen />
        </Route>
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
}
