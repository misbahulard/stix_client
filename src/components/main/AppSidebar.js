/**
 * AppSidebar.js
 * Berfungsi sebagai container Sidebar
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFire, 
  faSearch, 
  faArchive, 
  faEye, 
  faUser, 
  faTheaterMasks, 
  faCodeBranch
} from '@fortawesome/free-solid-svg-icons';

/**
 * Class yang mewakili komponen Sidebar
 */
class AppSidebar extends Component {

  /**
   * Membuat Sidebar
   * @param {any} props - berisi properti yang diturunkan dari parent
   */
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        root: true,
        bundle: false,
        observeddata: false,
        indicator: false,
        identity: false,
        threatactor: false,
        attackpattern: false
      }
    };
  }

  /**
   * saat komponen mendapatkan perubahan maka lakukan perubahan juga terhadap menu sidebar yang aktif
   * dengan memanggil fungsi @function changeActiveMenu
   * @param {props} prevProps - properti sebelumnya 
   */
  componentDidUpdate(prevProps) {
    if (prevProps.menuActivated !== this.props.menuActivated ) {
      this.changeActiveMenu();
    };
  }

  /**
   * berfungsi untuk mengubah menu yang aktif saat ini
   * yang didapat dari routing yang saat ini ada di cocokkan dengan kondisi menu yang sebelumnya
   */
  changeActiveMenu() {
    var menu = this.state.menu;
    var active_arr = String(this.props.menuActivated).split("/");
    var active = active_arr[1].replace(/[^\w\s]/gi, "");

    if (active == '') {
      active = 'root';
    }

    for (const item in menu) {
      if (menu.hasOwnProperty(item)) {
        if (item == active) {
          menu[item] = true;
        } else {
          menu[item] = false;
        }
      }
    }

    this.setState({
      menu: menu
    });
  }

  render() {
    return (
      <div className="main-sidebar">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a href="/">Stixie</a>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <a href="/">St</a>
          </div>
          <ul className="sidebar-menu">
            <li className="menu-header">Dashboard</li>
            <li className={ this.state.menu.root ? 'active' : '' }>
              <Link to="/"><FontAwesomeIcon icon={ faFire } /><span>Dashboard</span></Link>
            </li>
            <li className="menu-header">Features</li>
            <li className={ this.state.menu.bundle ? 'active' : '' }>
              <Link to="/bundle"><FontAwesomeIcon icon={ faArchive } /><span>STIX Bundle</span></Link>
            </li>
            <li className={ this.state.menu.observeddata ? 'active' : '' }>
              <Link to="/observed-data"><FontAwesomeIcon icon={ faSearch } /><span>Observed Data</span></Link>
            </li>
            <li className={ this.state.menu.indicator ? 'active' : '' }>
              <Link to="/indicator"><FontAwesomeIcon icon={ faEye } /><span>Indicator</span></Link>
            </li>
            <li className={ this.state.menu.identity ? 'active' : '' }>
              <Link to="/identity"><FontAwesomeIcon icon={ faUser } /><span>Identity</span></Link>
            </li>
            <li className={ this.state.menu.threatactor ? 'active' : '' }>
              <Link to="/threat-actor"><FontAwesomeIcon icon={ faTheaterMasks } /><span>Threat Actor</span></Link>
            </li>
            <li className={ this.state.menu.attackpattern ? 'active' : '' }>
              <Link to="/attack-pattern"><FontAwesomeIcon icon={ faCodeBranch } /><span>Attack Pattern</span></Link>
            </li>
          </ul>
        </aside>
      </div>
    )
  }
}

export default AppSidebar;