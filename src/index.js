import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./components/app/";

import "./i18n";

ReactDOM.render(<App />, document.getElementById("root"));
