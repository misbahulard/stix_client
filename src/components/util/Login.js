/**
 * Login.js
 * berfungsi sebagai container login
 */
import React, { Component } from 'react';
import axios from 'axios';
import {
  API_URL_LOGIN, 
  setUsername,
  setToken, 
  setRefreshToken, 
  setRefreshTime 
} from '../../api';

/**
 * Class yang mewakili komponen login
 */
class Login extends Component {

  /**
   * Membuat Login
   * @param {any} props - berisi properti yang diturunkan dari parent
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      redirect: false,
      message: '',
      isError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handle perubahan event pada form
   * Setel state sesuai dengan form yang diubah
   * @param {event} event - javascript event onChange
   */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  /**
   * handle submit form
   * lakukan pemanggilan API login, jika berhasil maka setel informasi username, token, refresh token, refresh time
   * pada local storage dan arahkan pengguna pada dashboard
   * jika tidak berhasil maka tampilkan pesan error
   * @param {event} event - javascript event onSubmit
   */
  handleSubmit(event) {
    event.preventDefault();
    axios.post(API_URL_LOGIN, {
      username: this.state.username,
      password: this.state.password
    }).then(result => {
      var data = result.data;
      if (data.success) {
        setUsername(this.state.username);
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setRefreshTime();
        this.setState({
          message: data.message,
          isError: false
        });
        this.props.handleAuth();
        this.props.history.push('/');
      } else {
        // TODO: To something here / tampilkan pesan error
        this.setState({
          message: data.message,
          isError: true
        })
      }
    }).catch(error => {
      // TODO: if there is error in server
      this.setState({
        message: error,
        isError: true
      })
    })
  }

  /**
   * Saat komponen di-mount, lakukan pengecekan terhadap properti 'authenticated'
   * jika pengguna telah terautentikasi maka paksa pengguna untuk menuju ke dashboard
   */
  componentDidMount() {
    // redirect to dashboard if already authenticated
    if (this.props.authenticated === true) {
      this.props.history.push('/');
    }
  }

  render() {
    return ( 
      <div id="app">
        <section className="section">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
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
              {this.state.isError ?
              <div className="alert alert-danger">
                {this.state.message}
              </div> : null
              }
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Login;