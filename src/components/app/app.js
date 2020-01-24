import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from '../pages/main-page';
import Header from "../header";
import "./app.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path='/' component={MainPage} exact/ >
          <Route path='/main' component={MainPage} exact/ >
        </Switch>
      </div>
    </Router>
  );
}

export default App;
