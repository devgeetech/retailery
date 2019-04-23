import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import logo from "./logo.svg";
import "./App.css";
import FeedProdList from "./components/feedProdList/FeedProdList.js";
import WishList from './components/WishList/WishList'
import FeedSpecProd from "./components/feedProdList/FeedSpecProd/FeedSpecProd"
import Direction from './components/Map/Direction'
import ProdView from './components/ProdView/ProdView'
import Layout from "./hoc/Layout/Layout";
import Geo from "./components/Map/Direction";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={FeedProdList} />
        <Route path="/geo" exact component={Geo} />
        <Route path="/FeedM" exact component={FeedSpecProd} />
        <Route path="/ProdView" exact component={ProdView} />
        <Route path="/MapView" exact component={Direction} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/wish" exact component={WishList} />
          <Route path="/FeedM" exact component={FeedSpecProd} />
          <Route path="/ProdView" exact component={ProdView} />
          <Route path="/MapView" exact component={Direction} />
          <Route path="/" exact component={FeedProdList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Layout>
//           <Route path="/" exact component={FeedProdList} />
//           <Route path="/geo" exact component={Geo} />
//           <Route path="/FeedM" exact component={FeedSpecProd} />
//         </Layout>
//       </div>
//     );
//   }
// }

// export default App;
