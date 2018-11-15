import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { 
  API_URL_REFRESH_TOKEN, 
  setHeader, 
  setToken, 
  getRefreshToken, 
  getRefreshTime,
  setRefreshTime
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
        sidebarPushCollapsed: false,
        currentTime: new Date().getTime(),
        execTime: getRefreshTime(),
        redirect: false,
        intervalId: '',
        menuActivated: '/'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
        sidebarPushCollapsed: !this.state.sidebarPushCollapsed
    });
  }

  tick() {
    this.setState({
      currentTime: new Date().getTime()
    });
    if (this.state.currentTime > this.state.execTime) {
      // force logout
      // this.props.handleLogout();

      this.setState({ isLoading: true });

      // Call refresh token
      var refresh_token = getRefreshToken();
      setHeader(refresh_token);
      axios.post(API_URL_REFRESH_TOKEN).then(result => {
        var data = result.data;
        if (data.success) {
          setToken(data.access_token);
          setRefreshTime();
          this.setState({
            isLoading: false,
            execTime: getRefreshTime()
          });
        } else {
          // TODO: To something here / redirect to login
          this.props.handleLogout();
        }
      }).catch(error => {
        this.setState({
          error,
          isLoading: false
        });
      });
    }
  }

  onRouteChanged() {
    this.setState({
      menuActivated: this.props.location.pathname
    });
  }

  componentDidMount() {
    if (this.state.execTime != null) {
      var interval = setInterval(() => this.tick(), 1000);
      this.setState({
        intervalId: interval
      });
    } else {
      return (<Redirect to={{pathname: '/login', state: {from: this.props.location}}} />);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sidebarPushCollapsed !== prevState.sidebarPushCollapsed) {
      document.body.classList.toggle('sidebar-mini', this.state.sidebarPushCollapsed);
    }
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  render() {
    return (
      <div className="App">
        <AppNavbar handleClick={this.handleClick} handleLogout={this.props.handleLogout} />
        <AppSidebar menuActivated={this.state.menuActivated} />
        <AppContent authenticated={this.props.authenticated} handleAuth={this.props.handleAuth} />
        <AppFooter />
      </div>
    );
  }
}

export default DefaultContainer;
