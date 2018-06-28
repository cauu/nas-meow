import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './home';
import Create from './create';
import Detail from './detail';
import Square from './square';

class Root extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/detail" component={Detail} />
          <Route path="/square" component={Square} />
        </React.Fragment>
      </Router>
    );
  }
}

export default Root;