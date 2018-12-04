/**
 * AppContent.js
 * Berfungsi sebagai container Konten dari aplikasi
 */
import React, { Component } from 'react';
import PrivateRoute from '../container/PrivateRoute';
import routes from '../../route';

/**
 * Class yang mewakili komponen Konten aplikasi
 */
class AppContent extends Component {
  render() {
    /**
     * Lakukan pengecekan terhadap route
     * dan lakukan render route sesuai dengan informasi yang diberikan {path, exact, dan component}
     * menggunakan bantuan komponen @module PrivateRoute
     */
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