import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Geo from "./components/Map/Geo";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import * as firebase from "firebase";
import FeedProdList from "./components/feedProdList/FeedProdList";

var config = {
  apiKey: "AIzaSyAu0pReHYzKAKWwFuepIHf8_1xwbBvweuM",
  authDomain: "shoppingspree-6e902.firebaseapp.com",
  databaseURL: "https://shoppingspree-6e902.firebaseio.com",
  projectId: "shoppingspree-6e902",
  storageBucket: "shoppingspree-6e902.appspot.com",
  messagingSenderId: "30003369612"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(function() {
    console.log("have permission");
    return messaging.getToken();
  })
  .catch(function(err) {
    console.log("error occured");
  });
messaging.onMessage(function (payload) {
  console.log('onmessage',payload);
});
// Get a reference to the database service

const app = (
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
