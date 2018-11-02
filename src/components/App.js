import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'

import './AppNavbar'
import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';
import AppContent from './AppContent';
import AppFooter from './AppFooter';

class App extends Component {

  constructor() {
    super();
    this.state = {
        sidbarPushCollapsed: false
    };
    this.handleClick = this.handleClick.bind(this);
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
        <AppNavbar handleClick={this.handleClick} />
        <AppSidebar />
        <AppContent />
        <AppFooter />
      </div>
    );
  }
}

export default App;
