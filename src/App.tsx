import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

import SiderDemo from './components/layout';
import IconSvg from './components/icon';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/">
          <SiderDemo>
            <Home />
          </SiderDemo>
        </Route>
        <Route path="/news">
          <SiderDemo>
            <NewsFeed />
          </SiderDemo>
        </Route>
      </Router>
    );
  }
}

export default App;


class Home extends Component {
  render() {
    return (
      <div>
        Home
        <IconSvg type="yxgl" />
      </div>
    );
  }
}

class NewsFeed extends Component {
  render() {
    return (
      <div>
        NewsFeed
        <IconSvg type="yzm" />
      </div>
    );
  }
}

