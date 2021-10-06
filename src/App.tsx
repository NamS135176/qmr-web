import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from 'screens/LoginScreen';
import ForgotPassScreen from 'screens/ForgotPassScreen';
import TestScreen from 'screens/TestScreen';
import Home from 'screens/Home/Home';

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
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
}
