import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import axios from 'axios';
import { API_URL_BUNDLES, setHeader } from '../api';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bundles: [],
      isLoading: false,
      error: null
    }
  }

  componentDidMount() {

    setHeader();

    this.setState({ isLoading: true });

    axios.get(API_URL_BUNDLES)
      .then(result => this.setState({
        bundles: result.data.data,
        isLoading: false
      }))
      .catch(error => this.setState({
          error,
          isLoading: false
        }));
  }

  render() {
    return ( 
      <section className="section">
        <h1 className="section-header">
          <div>Dashboard</div>
        </h1>
        <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="card card-sm-3">
                <div className="card-icon bg-primary">
                  <Ionicon icon="ios-search" fontSize="35px" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Observed Data</h4>
                  </div>
                  <div className="card-body">
                    10
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="card card-sm-3">
                <div className="card-icon bg-warning">
                  <Ionicon icon="ios-eye" fontSize="35px" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Indicator</h4>
                  </div>
                  <div className="card-body">
                    42
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="card card-sm-3">
                <div className="card-icon bg-success">
                  <Ionicon icon="ios-person" fontSize="35px" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Identity</h4>
                  </div>
                  <div className="card-body">
                    1,201
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="card card-sm-3">
                <div className="card-icon bg-danger">
                  <Ionicon icon="ios-people" fontSize="35px" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Threat Actor</h4>
                  </div>
                  <div className="card-body">
                    47
                  </div>
                </div>
              </div>
            </div>                  
          </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 col-12">
            <div className="card card-sm-3">
              <div className="card-icon bg-primary">
                <Ionicon icon="ios-git-network" fontSize="35px" />
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>Attack Pattern</h4>
                </div>
                <div className="card-body">
                  10
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <div className="card card-sm-3">
              <div className="card-icon bg-warning">
                <Ionicon icon="ios-archive" fontSize="35px" />
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>Bundle</h4>
                </div>
                <div className="card-body">
                  42
                </div>
              </div>
            </div>
          </div>                  
        </div>
        <div className="row">
            <div className="col-lg-8 col-md-12 col-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div className="float-right">
                    <div className="btn-group">
                      <a href="#" className="btn active">Week</a>
                      <a href="#" className="btn">Month</a>
                      <a href="#" className="btn">Year</a>
                    </div>
                  </div>
                  <h4>Statistics</h4>
                </div>
                <div className="card-body">
                  <canvas id="myChart" height="158"></canvas>
                  <div className="statistic-details mt-sm-4">
                    <div className="statistic-details-item">
                      <small className="text-muted"><span className="text-primary"><i className="ion-arrow-up-b"></i></span> 7%</small>
                      <div className="detail-value">$243</div>
                      <div className="detail-name">Today's Sales</div>
                    </div>
                    <div className="statistic-details-item">
                      <small className="text-muted"><span className="text-danger"><i className="ion-arrow-down-b"></i></span> 23%</small>
                      <div className="detail-value">$2,902</div>
                      <div className="detail-name">This Week's Sales</div>
                    </div>
                    <div className="statistic-details-item">
                      <small className="text-muted"><span className="text-primary"><i className="ion-arrow-up-b"></i></span>9%</small>
                      <div className="detail-value">$12,821</div>
                      <div className="detail-name">This Month's Sales</div>
                    </div>
                    <div className="statistic-details-item">
                      <small className="text-muted"><span className="text-primary"><i className="ion-arrow-up-b"></i></span> 19%</small>
                      <div className="detail-value">$92,142</div>
                      <div className="detail-name">This Year's Sales</div>
                    </div>
                  </div>
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
                    <li className="media">
                      <img className="mr-3 rounded-circle" width="50" src="../dist/img/avatar/avatar-1.jpeg" alt="avatar" />
                      <div className="media-body">
                        <div className="float-right"><small>10m</small></div>
                        <div className="media-title">Farhan A Mujib</div>
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</small>
                      </div>
                    </li>
                    <li className="media">
                      <img className="mr-3 rounded-circle" width="50" src="../dist/img/avatar/avatar-2.jpeg" alt="avatar" />
                      <div className="media-body">
                        <div className="float-right"><small>10m</small></div>
                        <div className="media-title">Ujang Maman</div>
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</small>
                      </div>
                    </li>
                    <li className="media">
                      <img className="mr-3 rounded-circle" width="50" src="../dist/img/avatar/avatar-3.jpeg" alt="avatar" />
                      <div className="media-body">
                        <div className="float-right"><small>10m</small></div>
                        <div className="media-title">Rizal Fakhri</div>
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</small>
                      </div>
                    </li>
                    <li className="media">
                      <img className="mr-3 rounded-circle" width="50" src="../dist/img/avatar/avatar-4.jpeg" alt="avatar" />
                      <div className="media-body">
                        <div className="float-right"><small>10m</small></div>
                        <div className="media-title">Alfa Zulkarnain</div>
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</small>
                      </div>
                    </li>
                  </ul>
                  <div className="text-center">
                    <a href="#" className="btn btn-primary btn-round">
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    )
  }
}

export default Dashboard;