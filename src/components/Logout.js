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


class DefaultContainer extends Component {

  logout() {
    this.setState({ isLoading: true });

    setHeader(getToken());
    axios.post(API_URL_LOGOUT).then(result => {
      var data = result.data;
      if (data.success) {
        destroySession();
        this.setState({
          isLoading: false,
          authenticated: false,
          execTime: null
        })
        return (<Redirect to={{pathname: '/login'}} />)
      } else {
        // TODO: To something went wrong
        this.setState({
          isLoading: false
        })
        console.log(data.message)
      }
    }).catch(error => {
      this.setState({
        error,
        isLoading: false
      })
    })
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="Logout">
      </div>
    );
  }
}

export default DefaultContainer;
