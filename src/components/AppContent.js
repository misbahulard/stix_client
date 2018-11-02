import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import routes from '../route';

class AppContent extends Component {
  render() {
    return (
      <div className="main-content">
        {routes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </div>
    )
  }
}

export default AppContent;