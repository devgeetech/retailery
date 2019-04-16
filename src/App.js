import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FeedProdList from './components/feedProdList/FeedProdList.js'
import Layout from './hoc/Layout/Layout';
import Geo from './components/Map/Geo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Geo />
          {/* <FeedProdList/> */}
        </Layout>      
      </div>
    );
  }
}

export default App;
