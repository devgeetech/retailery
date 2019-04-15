import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FeedProdList from './components/feedProdList/FeedProdList'
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <FeedProdList/>
        </Layout>      
      </div>
    );
  }
}

export default App;
