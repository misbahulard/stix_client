import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { 
  API_URL_REFRESH_TOKEN, 
  API_URL_LOGOUT,
  setHeader, 
  setToken, 
  getToken,
  getRefreshToken, 
  getRefreshTime,
  checkAuth, 
  destroySession,
  setRefreshTime
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
      currentTime: new Date().getTime(),
      execTime: getRefreshTime(),
      authenticated: checkAuth()
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.hadleLogout = this.handleLogout.bind(this);
  }

  handleAuth() {
    this.setState({
      error: null,
      authenticated: checkAuth(),
      execTime: getRefreshTime()
    });
  }

  handleLogout() {
    // this.setState({
    //   isLoading: true 
    // });

    setHeader(getToken());
    axios.post(API_URL_LOGOUT).then(result => {
      var data = result.data;
      if (data.success) {
        destroySession();
        this.setState({
          isLoading: false,
          authenticated: false,
          execTime: null
        });
        return (<Redirect to={{pathname: '/login'}} />)
      } else {
        // TODO: To something went wrong
        this.setState({
          isLoading: false
        });
        console.log(data.message)
      }
    }).catch(error => {
      // this.setState({
      //   error,
      //   isLoading: false
      // });
      console.log(error)
    });
  }

  tick() {
    this.setState({
      currentTime: new Date().getTime()
    })
    if (this.state.currentTime > this.state.execTime) {
      this.setState({ isLoading: true });

      // Call refresh token
      var refresh_token = getRefreshToken()
      setHeader(refresh_token)

      axios.post(API_URL_REFRESH_TOKEN).then(result => {
        var data = result.data;
        if (data.success) {
          setToken(data.access_token);
          setRefreshTime();
        } else {
          // TODO: To something here / redirect to login
          return (<Redirect to={{pathname: '/login', state: {from: this.props.location}}} />)
        }
      }).catch(error => {
        this.setState({
          error,
          isLoading: false
        })
      })
    }
  }

  componentDidMount() {
    if (this.state.execTime != null) {
      setInterval(() => this.tick(), 1000);
    } else {
      return (<Redirect to={{pathname: '/login', state: {from: this.props.location}}} />)
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/login" render={(props) => {
          return <Login {...props} handleAuth={this.handleAuth} authenticated={this.state.authenticated} />
        }} />
        <Route render={(props) => {
          return <DefaultContainer handleLogout={this.handleLogout} />
        }} />
      </Switch>
    );
  }
}

export default App;
