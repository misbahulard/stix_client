import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Ionicon from 'react-ionicons';

class AppSidebar extends Component {
  render() {
    return (
      <div className="main-sidebar">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a href="/">Stixie</a>
          </div>
          <div className="sidebar-user">
            <div className="sidebar-user-picture">
              <img alt="avatar" src="/img/avatar-1.jpeg" />
            </div>
            <div className="sidebar-user-details">
              <div className="user-name">Misbahul Ardani</div>
              <div className="user-role">
                Administrator
              </div>
            </div>
          </div>
          <ul className="sidebar-menu">
            <li className="menu-header">Dashboard</li>
            <li className="active">
              <Link to="/"><Ionicon icon="ios-speedometer-outline" /><span>Dashboard</span></Link>
            </li>
            <li className="menu-header">Features</li>
            <li><Link to="/bundle"><Ionicon icon="ios-archive" /><span>STIX Bundle</span></Link></li>
            <li><Link to="/observed-data"><Ionicon icon="ios-search" /><span>Observed Data</span></Link></li>
            <li><Link to="/indicator"><Ionicon icon="ios-eye" /><span>Indicator</span></Link></li>
            <li><Link to="/identity"><Ionicon icon="ios-people" /><span>Identity</span></Link></li>
            <li><Link to="/threat-actor"><Ionicon icon="ios-person" /><span>Threat Actor</span></Link></li>
            <li><Link to="/attack-pattern"><Ionicon icon="ios-git-network" /><span>Attack Pattern</span></Link></li>
          </ul>
        </aside>
      </div>
    )
  }
}

export default AppSidebar;