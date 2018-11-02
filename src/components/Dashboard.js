import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

class Dashboard extends Component {
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
        <div class="row">
            <div class="col-lg-8 col-md-12 col-12 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <div class="float-right">
                    <div class="btn-group">
                      <a href="#" class="btn active">Week</a>
                      <a href="#" class="btn">Month</a>
                      <a href="#" class="btn">Year</a>
                    </div>
                  </div>
                  <h4>Statistics</h4>
                </div>
                <div class="card-body">
                  <canvas id="myChart" height="158"></canvas>
                  <div class="statistic-details mt-sm-4">
                    <div class="statistic-details-item">
                      <small class="text-muted"><span class="text-primary"><i class="ion-arrow-up-b"></i></span> 7%</small>
                      <div class="detail-value">$243</div>
                      <div class="detail-name">Today's Sales</div>
                    </div>
                    <div class="statistic-details-item">
                      <small class="text-muted"><span class="text-danger"><i class="ion-arrow-down-b"></i></span> 23%</small>
                      <div class="detail-value">$2,902</div>
                      <div class="detail-name">This Week's Sales</div>
                    </div>
                    <div class="statistic-details-item">
                      <small class="text-muted"><span class="text-primary"><i class="ion-arrow-up-b"></i></span>9%</small>
                      <div class="detail-value">$12,821</div>
                      <div class="detail-name">This Month's Sales</div>
                    </div>
                    <div class="statistic-details-item">
                      <small class="text-muted"><span class="text-primary"><i class="ion-arrow-up-b"></i></span> 19%</small>
                      <div class="detail-value">$92,142</div>
                      <div class="detail-name">This Year's Sales</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 col-12 col-sm-12">
              <div class="card">
                <div class="card-header">
                  <h4>Recent Activities</h4>
                </div>
                <div class="card-body">             
                  <ul class="list-unstyled list-unstyled-border">
                    <li class="media">
                      <img class="mr-3 rounded-circle" width="50" src="../dist/img/avatar/avatar-1.jpeg" alt="avatar" />
                      <div class="media-body">
                        <div class="float-right"><small>10m</small></div>
                        <div class="media-title">Farhan A Mujib</div>
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</small>
                      </div>
                    </li>
                    <li class="media">
                      <img class="mr-3 rounded-circle" width="50" src="../dist/img/avatar/avatar-2.jpeg" alt="avatar" />
                      <div class="media-body">
                        <div class="float-right"><small>10m</small></div>
                        <div class="media-title">Ujang Maman</div>
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</small>
                      </div>
                    </li>
                    <li class="media">
                      <img class="mr-3 rounded-circle" width="50" src="../dist/img/avatar/avatar-3.jpeg" alt="avatar" />
                      <div class="media-body">
                        <div class="float-right"><small>10m</small></div>
                        <div class="media-title">Rizal Fakhri</div>
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</small>
                      </div>
                    </li>
                    <li class="media">
                      <img class="mr-3 rounded-circle" width="50" src="../dist/img/avatar/avatar-4.jpeg" alt="avatar" />
                      <div class="media-body">
                        <div class="float-right"><small>10m</small></div>
                        <div class="media-title">Alfa Zulkarnain</div>
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</small>
                      </div>
                    </li>
                  </ul>
                  <div class="text-center">
                    <a href="#" class="btn btn-primary btn-round">
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