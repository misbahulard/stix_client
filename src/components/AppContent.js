import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import routes from '../route';

class AppContent extends Component {
  render() {
    return (
      <div className="main-content">
        {routes.map((route, index) => {
          if (route.path == '/login') {
            return (
              <PublicRoute 
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
                authenticated={this.props.authenticated}
                handleAuth={this.props.handleAuth} />
            )
          } else {
           return (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component} 
              authenticated={this.props.authenticated} />
           )
          }
        })}
      </div>
    )
  }
}

export default AppContent;