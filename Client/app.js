import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';


import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="home" component={Main} /*onEnter={requireAuth}*/ />
      <Route path="Signup" component={Signup} />
      <Route path="Login" component={Login} />
    </Route>
  </Router>
	
), document.getElementById('app'));