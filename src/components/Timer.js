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

class Timer extends Component {

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

  render() {
    return (
      <div className="timer"></div>
    );
  }
}

export default Timer;
