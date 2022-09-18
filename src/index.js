import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import App from "./components/app/";
import createSagaMiddleware from "redux-saga";
import { projectsReducer, projectDataReducer, authorizationReducer, tagsReducer } from "./store/reducers";
import { watchProjects } from './store/sagas/index';

import "./i18n";
import "./index.scss";

const rootReducer = {
  authorization: authorizationReducer,
  projects: projectsReducer,
  projectData: projectDataReducer,
  tags: tagsReducer
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(watchProjects);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
