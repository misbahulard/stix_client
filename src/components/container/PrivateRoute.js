/**
 * PrivateRoute.js
 * berfungsi sebagai komponen pembantu untuk routing yang terproteksi
 * atau routing yang harus login terlebih dahulu
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * fungsi untuk komponen Private Route
 * @param {object} param - daftar object untuk render routing
 */
function PrivateRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default PrivateRoute;
