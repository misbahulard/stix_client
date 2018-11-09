import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_URL_LOGIN, setToken, setRefreshToken, setRefreshTime } from '../api';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(API_URL_LOGIN, {
      username: this.state.username,
      password: this.state.password
    }).then(result => {
      var data = result.data;
      if (data.success) {
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setRefreshTime();
        this.props.handleAuth();
        this.props.history.push('/');
      } else {
        // TODO: To something here / tampilkan pesan error
        console.log(data.success);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    // redirect to dashboard if already authenticated
    if (this.props.authenticated === true) {
      this.props.history.push('/');
    }
  }

  render() {
    return ( 
      <section className="section">
        <div className="login-brand">
              Stixie
        </div>

        <div className="card card-primary">
          <div className="card-header"><h4>Login</h4></div>

          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" className="form-control" name="username" tabIndex="1" required autoFocus
                  value={this.state.username} onChange={this.handleChange} />
                <div className="invalid-feedback">
                  Please fill in your username
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="form-control" name="password" tabIndex="2" required 
                  value={this.state.password} onChange={this.handleChange}/>
                <div className="invalid-feedback">
                  please fill in your password
                </div>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" tabIndex="4">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Login;