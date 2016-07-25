import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';


import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


// ReactDOM.render((
//    <Router history = {browserHistory}>
//       <Route path = "/" component = {App}>
//          <IndexRoute component = {Home} />
//          <Route path = "home" component = {Home} />
//          <Route path = "about" component = {About} />
//          <Route path = "contact" component = {Contact} />
//       </Route>
//    </Router>
	
// ), document.getElementById('app'))


// function requireAuth(nextState, replace, cb) {
//   // console.log('window inside requireAuth is', this.props);
//   var xhr = new XMLHttpRequest();
//   xhr.addEventListener("readystatechange", function() {
//     console.log('outside readystate');
//     if (this.readyState == 4) {
//       console.log('this.responseText from requireAuth is', this.responseText);
//       console.log('this.responseText from requireAuth is', !this.responseText);
//       if(!this.responseText) {
//         console.log('inside true portion of if');
//         cb();
//       } else {
//         console.log('inside false portion of if');
//         window.location = '/login';
//       }
//     }
//   });
//   xhr.open("GET", "http://127.0.0.1:3000/loggedIn");
//   xhr.send();
//   // console.log('window.session is', window.session);
//   // if (!window.session) {
//   //   window.location = '/login';
//   // } else {
//   //   cb();
//   // }
// }

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