import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Geo from "./components/Map/Geo"
import Location from "../src/Location/Real-time/User_location";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

const app = (
  <BrowserRouter basename="/">
    <Geo />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
