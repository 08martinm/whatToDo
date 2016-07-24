import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';


class Signup extends React.Component {
  
        constructor(props) {
        super(props);
        this.state = {username: '', password: ''}
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }




/*
    ***************************************************
     * @handleUsernameChange
     * Uses component state to update username on change
     * e = represents the event.
    *****************************************************
*/
    handleUsernameChange(e) {
      this.setState({username: e.target.value});
      console.log(this.state.username);
    }

    handlePasswordChange(e) {
      this.setState({password: e.target.value});
      console.log(this.state.password);
    }

    handleSubmit(e) {
      console.log('username: ', this.state.username, '\npassword: ', this.state.password);
      var xhr = new XMLHttpRequest();
      var data = "data=" + JSON.stringify({username: this.state.username, password: this.state.password});
      xhr.withCredentials = false;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          window.location = xhr.responseText;
        }
      };
      xhr.open("POST", "http://127.0.0.1:3000/signup");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }

    render() {
          return (
        <div>
          <div id="videoBackgroundContainer">
            <video id="videoBackground" autoPlay muted loop>
              <source src="./lib/video/slowmoheadla.mp4" type="video/mp4" />
              <source src="./lib/video/slowmoheadla.ogv" type="video/ogv" />
              Your browser doesn't support HTML5 video.
            </video>
          </div>
          <div id="loginForm" className="col-xs-10 col-xs-offset-1 col-sm-8 
              col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <form className="form-horizontal col-xs-8 col-xs-offset-2">
              <fieldset>

                <div className="form-group">
                  <label className="control-label">Username</label>
                  <div>
                    <input type="text" className="form-control" placeholder="Username" onChange={this.handleUsernameChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label">Password</label>
                  <div>
                    <input type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label">Confirm Password</label>
                  <div>
                    <input type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
                  </div>
                </div>

                <button className='signIn btn btn-success' type='button' onClick={this.handleSubmit}>Sign Up!</button>

                <div className="row">
                  <label className="control-label">Already a member?</label>
                </div>

                <div className="row">
                  <Link to='/Login'><button className='signUp btn btn-danger'>Login!</button></Link>
                </div>

              </fieldset>
            </form>
          </div>
        </div>
      );
    }
}

export default Signup;