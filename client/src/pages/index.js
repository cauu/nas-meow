import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider as MobxProvider } from 'mobx-react';

import Home from './home';
import Create from './create';
import Detail from './detail';
import Square from './square';

import store from '../store';

class Root extends Component {
  render() {
    return (

      <MobxProvider {...store}>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/square" component={Square} />
          </React.Fragment>
        </Router>
      </MobxProvider>
    );
  }
}

export default Root;