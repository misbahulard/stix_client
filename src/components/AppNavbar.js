import React, { Component } from 'react';

import { getUsername } from '../api';

import {
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      username: '',
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount() {
    this.setState({
      username: getUsername()
    });
  }
  render() {
    return (
      <div className="navbar-wrapper">
        <div className="navbar-bg"></div>
        <Navbar className="main-navbar" expand="lg">
          <a href="#" onClick={this.props.handleClick} className="nav-link nav-link-lg">
            <FontAwesomeIcon icon={ faBars } size="lg" />
          </a>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <img alt="image" src="/img/avatar/avatar-1.png" width="30" className="rounded-circle mr-1"></img>
                  Hi, {this.state.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="has-icon pointer">
                    <FontAwesomeIcon icon={ faUser } />
                    Profile
                  </DropdownItem>
                  <DropdownItem className="has-icon text-danger pointer" onClick={this.props.handleLogout}>
                    <FontAwesomeIcon icon={ faSignOutAlt } />
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;