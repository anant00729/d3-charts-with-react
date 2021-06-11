import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DotGraph from "./DotGraph";
import Header from "./Header";
import Histogram from "./Histogram";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Histogram} />
            <Route exact path="/dot-plot" component={DotGraph} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
