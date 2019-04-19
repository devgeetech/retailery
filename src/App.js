import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FeedProdList from "./components/feedProdList/FeedProdList.js";
import FeedSpecProd from "./components/feedProdList/FeedSpecProd/FeedSpecProd";
import Layout from "./hoc/Layout/Layout";
import Geo from "./components/Map/Geo"
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={FeedProdList} />
          <Route path="/geo" exact component={Geo} />
          <Route path="/FeedM" exact component={FeedSpecProd} />
        </Layout>
      </div>
    );
  }
}

export default App;
