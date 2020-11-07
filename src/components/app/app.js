import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../header";
import Contacts from "../pages/contacts";
import GalleryPage from "../pages/gallery-page";
import MainPage from "../pages/main-page";
import Workshop from "../pages/workshop";
import "./app.scss";
import ProjectsDetails from "../project-details";


function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/main" component={MainPage} exact />
        <Route path="/projects" component={GalleryPage} exact />
        <Route path="/projects/:id" component={ProjectsDetails} exact />
        <Route path="/contacts" component={Contacts} exact />
        <Route path="/workshop" component={Workshop} exact />
      </Switch>
    </div>
  );
}

export default App;
