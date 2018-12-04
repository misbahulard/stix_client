/**
 * DefaultContainer.js
 * Berfungsi untuk container default semua item
 */
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css'

import AppNavbar from '../main/AppNavbar';
import AppSidebar from '../main/AppSidebar';
import AppContent from '../main/AppContent';
import AppFooter from '../main/AppFooter';
import Timer from '../util/Timer';

/**
 * Class yang mewakili Default Container
 */
class DefaultContainer extends Component {

  /**
   * Membuat Default Container
   * @param {any} props - berisi properti yang diturunkan dari parent
   */
  constructor(props) {
    super(props);
    this.state = {
        sidebarPushCollapsed: false,
        menuActivated: '/'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * handle perubahan event pada click
   * Setel state sidebar ke true / false
   * @param {event} event - javascript event onClick
   */
  handleClick() {
    this.setState({
        sidebarPushCollapsed: !this.state.sidebarPushCollapsed
    });
  }

  /**
   * handle perubah pada routing
   * setel state kondisi menu yang aktif sesuai dengan route
   */
  onRouteChanged() {
    this.setState({
      menuActivated: this.props.location.pathname
    });
  }

  /**
   * ketika komponen di-mount 
   * lakukan perubahan pada state menu yang aktif sesuai dengan route
   */
  componentDidMount() {
    this.setState({
      menuActivated: this.props.location.pathname
    });
  }

  /**
   * Ketika komponen mendapatkan perubahan data
   * ubah kondisi side bar, lebarkan atau kecilkan
   * dan panggil @function onRouteChanged jika terjadi perubahaan route url
   * @param {object} prevProps - properti sebelumnya
   * @param {object} prevState - state sebelumnya
   */
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
        <Timer location={this.props.location} handleLogout={this.props.handleLogout} />
        <AppFooter />
      </div>
    );
  }
}

export default DefaultContainer;
