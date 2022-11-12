import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import App from "./components/app/";
import createSagaMiddleware from "redux-saga";
import { projectsReducer, projectDataReducer, authorizationReducer, tagsReducer } from "./store/reducers";
import { watchProjects } from './store/sagas/index';
import * as actionTypes from './store/actions/actionTypes';

import "./i18n";
import "./index.scss";

const rootReducer = {
  authorization: authorizationReducer,
  projects: projectsReducer,
  projectDetails: projectDataReducer,
  tags: tagsReducer
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: false, 
    serializableCheck: {
      ignoredActions: [actionTypes.ADD_PROJECT, actionTypes.UPDATE_PROJECT, actionTypes.UPDATE_PROJECT_DETAILS_IMAGE]
    }
  }).concat(sagaMiddleware),
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
