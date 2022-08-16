import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../header";
import Contacts from "../pages/contacts";
import GalleryPage from "../pages/gallery-page";
import MainPage from "../pages/main-page";
import Studio from "../pages/studio";
import "./app.scss";
import ProjectsDetails from "../project-details";


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/projects" element={<GalleryPage />} />
        <Route path="/projects/:id" element={<ProjectsDetails />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
    </div>
  );
}

export default App;
