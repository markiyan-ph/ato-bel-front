import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "../pages/main-page";
import Header from "../header";
import "./app.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/main" component={MainPage} exact />
      </Switch>
    </div>
  );
}

export default App;
