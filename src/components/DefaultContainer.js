import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { 
  API_URL_REFRESH_TOKEN, 
  setHeader, 
  setToken, 
  getRefreshToken, 
  getRefreshTime,
  checkAuth 
} from '../api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'

import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';
import AppContent from './AppContent';
import AppFooter from './AppFooter';

class DefaultContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        sidbarPushCollapsed: false,
        currentTime: new Date().getTime(),
        execTime: getRefreshTime(),
        authenticated: checkAuth()
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth() {
    this.setState({
      authenticated: checkAuth(),
      execTime: getRefreshTime()
    });
  }

  tick() {
    this.setState({
      currentTime: new Date().getTime()
    })
    if (this.state.currentTime > this.state.execTime) {
      // Call refresh token
      var refresh_token = getRefreshToken()
      setHeader(refresh_token)

      axios.post(API_URL_REFRESH_TOKEN).then(result => {
        var data = result.data;
        if (data.success) {
          setToken(data.access_token);
        } else {
          // TODO: To something here / redirect to login
          return (<Redirect to={{pathname: '/login', state: {from: this.props.location}}} />)
        }
      }).catch(error => {
        console.log(error)
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

  componentDidUpdate() {
    document.body.classList.toggle('sidebar-gone', this.state.sidbarPushCollapsed)
  }

  handleClick() {
      this.setState({
          sidbarPushCollapsed: !this.state.sidbarPushCollapsed
      });
  }

  render() {
    return (
      <div className="App">
        <AppNavbar handleClick={this.handleClick} handleLogout={this.props.handleLogout} />
        <AppSidebar />
        <AppContent authenticated={this.state.authenticated} handleAuth={this.handleAuth} />
        <AppFooter />
      </div>
    );
  }
}

export default DefaultContainer;
