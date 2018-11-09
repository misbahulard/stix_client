import React, { Component } from 'react';

import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import Ionicon from 'react-ionicons';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="navbar-wrapper">
        <div className="navbar-bg"></div>
        <Navbar expand="md">
          <a href="#" onClick={this.props.handleClick} className="nav-link nav-link-lg">
            <Ionicon icon="ios-menu" color="#fff" />
          </a>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Notification</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hi, Misbah
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="has-icon">
                    <Ionicon icon="ios-person" />
                    Profile
                  </DropdownItem>
                  <DropdownItem className="has-icon" onClick={this.props.handleLogout}>
                    <Ionicon icon="ios-log-out" />
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