import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'

import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import Timer from './Timer';

class DefaultContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        sidebarPushCollapsed: false,
        menuActivated: '/'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
        sidebarPushCollapsed: !this.state.sidebarPushCollapsed
    });
  }

  onRouteChanged() {
    this.setState({
      menuActivated: this.props.location.pathname
    });
  }

  componentDidMount() {
    this.setState({
      menuActivated: this.props.location.pathname
    });
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
        <Timer location={this.props.location} handleLogout={this.props.handleLogout} />
        <AppFooter />
      </div>
    );
  }
}

export default DefaultContainer;
