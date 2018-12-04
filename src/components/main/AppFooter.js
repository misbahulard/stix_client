/**
 * AppFooter.js
 * berfungsi sebagai container Footer
 */
import React, { Component } from 'react';

/**
 * Class yang mewakili komponen Footer
 */
class AppFooter extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="footer-left">
          Copyright &copy; 2018 <div className="bullet"></div> Design By <a href="https://multinity.com/">Multinity</a>
        </div>
        <div className="footer-right"></div>
      </footer>
    )
  }
}

export default AppFooter;