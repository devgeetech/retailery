import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Geo from './components/Map/Geo'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import * as firebase from "firebase";
import FeedProdList from './components/feedProdList/FeedProdList';

var config = {
    apiKey: "AIzaSyDrN8PymBoXSe8fYVZ0BvSG9rLaP4o8kak",
    authDomain: "shoppingspree-6e902.firebaseapp.com",
    databaseURL: "https://shoppingspree-6e902.firebaseio.com",
    storageBucket: "shoppingspree-6e902.appspot.com"
  };
firebase.initializeApp(config);

  // Get a reference to the database service



const app = (
  <BrowserRouter basename="/">
    <App/>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
