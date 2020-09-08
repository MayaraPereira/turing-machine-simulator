import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Instructions from './Instructions';
import About from './About';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/instructions" component={Instructions} />
      <Route path="/about" component={About} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
