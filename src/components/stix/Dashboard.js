/**
 * Dashboard.js
 * Berfungsi sebagai container Dashboard
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { 
  API_URL_OBSERVED_DATA,
  API_URL_INDICATOR,
  API_URL_IDENTITY,
  API_URL_THREAT_ACTOR,
  API_URL_ATTACK_PATTERN,
  API_URL_BUNDLES, 
  setHeader, 
  getToken 
} from '../../api';

import StixGraph from './StixGraph';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faArchive, 
  faEye, 
  faUser, 
  faTheaterMasks, 
  faCodeBranch
} from '@fortawesome/free-solid-svg-icons';

/**
 * Class yang mewakili komponen Dashboard
 */
class Dashboard extends Component {

  /**
   * Membuat Dashboard
   * @param {any} props - berisi properti yang diturunkan dari parent
   */
  constructor(props) {
    super(props);

    this.state = {
      elementSize: {
        width: 0,
        height: 0
      },
      observed_datas: {
        data: [],
        size: 0
      },
      indicators: {
        data: [],
        size: 0
      },
      identities: {
        data: [],
        size: 0
      },
      threat_actors: {
        data: [],
        size: 0
      },
      attack_patterns: {
        data: [],
        size: 0
      },
      bundles: {
        data: [],
        size: 0
      },
      isLoading: true,
      error: null
    }
  }

  /**
   * Berfungsi sebagai callback dari reference elemen DOM
   * Untuk mengukur tinggi dan lebar dari elemen DOM dan melakukan perubahan pada state
   */
  refCallback = element => {
    if (element) {
      this.elementRef = element;
      var el = element.getBoundingClientRect();
      this.setState({
        elementSize: {
          width: el.width - 80,
          height: el.height
        }
      })
    }
  };

  /**
   * saat komponen di-mount, 
   * - setel loading = True
   * - lakukan pemanggilan API [Observed Data, Indicator, Identity, Threat Actor, Attack Pattern Bundle]
   * - lakukan perubahan pada state sesuai dengan tiap datanya.
   */
  componentDidMount() {
    this.setState({ isLoading: true });

    setHeader(getToken())
    // call observed-data
    axios.post(API_URL_OBSERVED_DATA)
      .then(result => this.setState({
        observed_datas: {
          data: result.data.data,
          size: result.data.size
        },
        isLoading: false
      }))
      .catch(error => this.setState({
          error,
          isLoading: false
        }));

    // call indicator
    axios.post(API_URL_INDICATOR)
      .then(result => this.setState({
        indicators: {
          data: result.data.data,
          size: result.data.size
        },
        isLoading: false
      }))
      .catch(error => this.setState({
          error,
          isLoading: false
        }));
    
    // call identity
    axios.post(API_URL_IDENTITY)
      .then(result => this.setState({
        identities: {
          data: result.data.data,
          size: result.data.size
        },
        isLoading: false
      }))
      .catch(error => this.setState({
          error,
          isLoading: false
        }));

    // call threat-actor
    axios.post(API_URL_THREAT_ACTOR)
      .then(result => this.setState({
        threat_actors: {
          data: result.data.data,
          size: result.data.size
        },
        isLoading: false
      }))
      .catch(error => this.setState({
          error,
          isLoading: false
        }));

    // call attack-pattern
    axios.post(API_URL_ATTACK_PATTERN)
      .then(result => this.setState({
        attack_patterns: {
          data: result.data.data,
          size: result.data.size
        },
        isLoading: false
      }))
      .catch(error => this.setState({
          error,
          isLoading: false
        }));

    // call bundle
    axios.post(API_URL_BUNDLES)
      .then(result => this.setState({
        bundles: {
          data: result.data.data,
          size: result.data.size
        },
        isLoading: false
      }))
      .catch(error => this.setState({
          error,
          isLoading: false
        }));
  }

  render() {
    /**
     * jika kondisi loading = True
     * maka tampilkan halaman loading
     */
    if (this.state.isLoading === true ) {
      return (
        <section className="section">
          <div className="section-header">
            <h1>Loading..</h1>
          </div>
        </section>
      )
    } else {
      return ( 
        <section className="section">
          <div className="section-header">
            <h1>Dashboard</h1>
          </div>
          <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                  <div className="card-icon bg-primary">
                    <FontAwesomeIcon icon={ faSearch } size="2x" color="white" />
                  </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Observed Data</h4>
                    </div>
                    <div className="card-body">
                      { this.state.observed_datas.size }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                  <div className="card-icon bg-warning">
                    <FontAwesomeIcon icon={ faEye } size="2x" color="white" />
                  </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Indicator</h4>
                    </div>
                    <div className="card-body">
                    { this.state.indicators.size }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                  <div className="card-icon bg-success">
                    <FontAwesomeIcon icon={ faUser } size="2x" color="white" />
                  </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Identity</h4>
                    </div>
                    <div className="card-body">
                    { this.state.identities.size }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="card card-statistic-1">
                  <div className="card-icon bg-danger">
                    <FontAwesomeIcon icon={ faTheaterMasks } size="2x" color="white" />
                  </div>
                  <div className="card-wrap">
                    <div className="card-header">
                      <h4>Threat Actor</h4>
                    </div>
                    <div className="card-body">
                    { this.state.threat_actors.size }
                    </div>
                  </div>
                </div>
              </div>                  
            </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-primary">
                  <FontAwesomeIcon icon={ faCodeBranch } size="2x" color="white" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Attack Pattern</h4>
                  </div>
                  <div className="card-body">
                  { this.state.attack_patterns.size }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-warning">
                  <FontAwesomeIcon icon={ faArchive } size="2x" color="white" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Bundle</h4>
                  </div>
                  <div className="card-body">
                    { this.state.bundles.size }
                  </div>
                </div>
              </div>
            </div>                  
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4>Recent Bundle Visualization</h4>
                </div>
                <div className="card-body" ref={this.refCallback}>
                  <StixGraph data={this.state.bundles.data[0]} size={this.state.elementSize} />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4>Recent Activities</h4>
                </div>
                <div className="card-body">             
                  <ul className="list-unstyled list-unstyled-border">
                    { this.state.bundles.data.slice(0, 5).map((item, index) => {
                      return (
                        <li className="media" key={index}>
                          <div className="media-body">
                            <div className="float-right"><small>{ String(new Date(item.objects[4].modified).toDateString()) }</small></div>
                            <div className="media-title">
                              <Link to={"/bundle/" + item.id}>{ item.id }</Link>
                            </div>
                            <small>From { item.objects[4].name } attacker</small>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="text-center">
                    <Link to="/bundle" className="btn btn-primary btn-round">View All</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }

   
  }
}

export default Dashboard;