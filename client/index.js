import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./styles.css";

// target the root - id we gave to div in index.html
const container = document.getElementById("root");
const root = createRoot(container);
// render the App within the Provider (built-in, allowing us to pass store to children)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
