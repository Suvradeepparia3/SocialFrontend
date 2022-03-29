import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import CreateUser from "./Pages/createUser";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/home" exact component={Home} />
          <Route path="/create" exact component={CreateUser} />
        </Switch>
      </Router>
    );
  }
}
