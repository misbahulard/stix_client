import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { 
  API_URL_LOGOUT,
  setHeader, 
  getToken,
  checkAuth, 
  destroySession,
} from '../api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'

import DefaultContainer from './DefaultContainer';
import Login from './Login';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      authenticated: checkAuth()
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleAuth() {
    this.setState({
      authenticated: checkAuth()
    });
  }

  handleLogout() {
    // call logout api
    this.setState({
      isLoading: true
    });

    setHeader(getToken());
    axios.post(API_URL_LOGOUT).then(result => {
      var data = result.data;
      if (data.success) {
        destroySession();
        this.setState({
          authenticated: false
        });
      } else {
        // TODO: To something here / something wrong / force logout
        this.props.handleLogout();
      }
    }).catch(error => {
      this.setState({
        error,
        isLoading: false
      });
    });
  }

  render() {
    return (
      <Switch>
        <Route path="/login" render={(props) => {
          return <Login {...props} handleAuth={this.handleAuth} authenticated={this.state.authenticated} />
        }} />
        <Route render={(props) => {
          return <DefaultContainer {...props} handleLogout={this.handleLogout} authenticated={this.state.authenticated} />
        }} />
      </Switch>
    );
  }
}

export default App;
