import React, { Component } from 'react';
import PrivateRoute from './PrivateRoute';
import routes from '../route';

class AppContent extends Component {
  render() {
    return (
      <div className="main-content">
        {routes.map((route, index) => {
          return (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component} 
            authenticated={this.props.authenticated} />
          )
        })}
      </div>
    )
  }
}

export default AppContent;