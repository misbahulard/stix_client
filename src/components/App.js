/**
 * App.js
 * berfungsi sebagai container utama dari aplikasi.
 */
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

import DefaultContainer from './container/DefaultContainer';
import Login from './util/Login';

/**
 * Class yang mewakili komponen App
 */
class App extends Component {
  /**
   * Membuat App
   * @param {any} props - berisi properti yang diturunkan dari parent
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      authenticated: checkAuth()
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  /**
   * handle autentikasi user
   * update kondisi state 'authenticated' ke local storage
   */
  handleAuth() {
    this.setState({
      authenticated: checkAuth()
    });
  }

  /**
   * handle logout user
   * - update state loading
   * - panggil api untuk logout
   * hancurkan semua state dan isi dari localstorage yang berhubungan dengan user
   */
  handleLogout() {
    // call logout api
    this.setState({
      isLoading: true
    });
    
    setHeader(getToken());
    axios.post(API_URL_LOGOUT).then(result => {
      console.log(result)
      var data = result.data;
      if (data.success) {
        destroySession();
        this.setState({
          authenticated: false
        });
      } else {
        // TODO: To something here / something wrong / force logout
        console.log("log out failed, something wrong.")
      }
    }).catch(error => {
      this.setState({
        error,
        isLoading: false
      });
      // jika status "unauthorized" maka paksa log out / hapus token 
      if (error.response.status === 401) {
        destroySession();
        this.setState({
          authenticated: false
        });
      }
    });
  }

  render() {
    return (
      /**
       * jika url = login maka arahkan ke komponen login
       * jika tidak maka arahkan ke komponen Default Container [main app]
       */
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
