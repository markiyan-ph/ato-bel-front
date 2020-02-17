import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../header";
import Contacts from "../pages/contacts";
import MainPage from "../pages/main-page";
import "./app.scss";

function App({location}) {
  console.log(location);
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/main" component={MainPage} exact />
        <Route path="/contacts" component={Contacts} exact />
      </Switch>
    </div>
  );
}

export default App;
