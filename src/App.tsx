import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import ForgotPassScreen from './screens/ForgotPassScreen';
import TestScreen from './screens/TestScreen';
import Home from './screens/Home/Home';

export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/forgot_password">
          <ForgotPassScreen />
        </Route>
        <Route path="/test">
         <TestScreen></TestScreen>
        </Route>
        <Route path="/">
          <LoginScreen></LoginScreen>
        </Route>
      </Switch>
    </Router>
  );
}
