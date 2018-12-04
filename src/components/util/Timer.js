/**
 * Timer.js
 * Berfungsi sebagai utilitas untuk menghitung waktu sesi user aktif
 * Jika sesi telah habis paksa logout user
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getRefreshTime } from '../../api';
/**
 * Class yang mewakili komponen utilitas Timer 
 */
class Timer extends Component {

  /**
   * Membuat Timer
   * @param {any} props - berisi properti yang diturunkan dari parent
   */
  constructor(props) {
    super(props);
    this.state = {
        sidebarPushCollapsed: false,
        currentTime: new Date().getTime(),
        execTime: getRefreshTime(),
        redirect: false,
        intervalId: '',
        menuActivated: '/'
    };
  }

  /**
   * Fungsi untuk melakukan pengecekan sesi tiap detik
   * Jika waktu saat ini lebih dari waktu sesi dari user maka paksa untuk logout
   */
  tick() {
    this.setState({
      currentTime: new Date().getTime()
    });
    if (this.state.currentTime > this.state.execTime) {
      // force logout
      this.props.handleLogout();
    }
  }

  /**
   * Saat komponen di-mount, jika waktu eksekusi tidak ada (atau belum login) maka paksa untuk login
   * Jika tidak maka setel timer untuk pengecekan sesi
   */
  componentDidMount() {
    if (this.state.execTime != null) {
      var interval = setInterval(() => this.tick(), 1000);
      this.setState({
        intervalId: interval
      });
    } else {
      return (<Redirect to={{pathname: '/login', state: {from: this.props.location}}} />);
    }
  }

  /**
   * Saat komponen di unmount, hapus timer yang telah disetel sebelumnya
   */
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <div className="timer"></div>
    );
  }
}

export default Timer;
