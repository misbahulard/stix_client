import React, { Component } from 'react';

import axios from 'axios';
import { 
  API_URL_OBSERVED_DATA, 
  setHeader, 
  getToken 
} from '../api';

import ReactTable from "react-table";
import "../css/custom-react-table.css";

class ObservedData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      observedDatas: {
        data: [],
        pages: null,
        loading: false
      },
      selectedData: null,
      isLoading: true,
      error: null
    }
    this.fetchData = this.fetchData.bind(this);
    this.handleClickId = this.handleClickId.bind(this);
  }

  handleClickId(data) {
    this.setState({
      selectedData: data
    });
  }

  fetchData(state, instance) {
    this.setState({
      observedDatas: {
        loading: true
      }
    })

    axios.post(API_URL_OBSERVED_DATA, {
      offset: state.page,
      limit: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered
    })
      .then(result => {
        this.setState({
          observedDatas: {
            data: result.data.data,
            pages: result.data.size,
            loading: false
          },
          isLoading: false
        })
      })
      .catch(error => this.setState({
          error,
          isLoading: false
        }));
  }

  componentDidMount() {
    setHeader(getToken())

    if (this.props.match.params.id) {
      var id = this.props.match.params.id;
      axios.get(API_URL_OBSERVED_DATA + "/" + id)
        .then(result => {
          this.setState({
            observedDatas: {
              data: result.data,
              pages: 1,
              loading: false
            },
            selectedData: result.data,
            isLoading: false
          })
        })
        .catch(error => this.setState({
            error,
            isLoading: false
          }));
    } else {
      axios.post(API_URL_OBSERVED_DATA)
        .then(result => {
          this.setState({
            observedDatas: {
              data: result.data.data,
              pages: result.data.size,
              loading: false
            },
            selectedData: result.data.data[0],
            isLoading: false
          })
        })
        .catch(error => this.setState({
            error,
            isLoading: false
          }));
    }
  }

  render() {
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
            <h1>Observed Data</h1> 
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 col-sm-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Observed Detail</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">ID</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.id}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Type</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.type}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">First Observed</div>
                    <div className="col-md-10 col-9 col-sm-8">: {String(new Date(this.state.selectedData.first_observed).toDateString())}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Last Observed</div>
                    <div className="col-md-10 col-9 col-sm-8">: {String(new Date(this.state.selectedData.last_observed).toDateString())}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Number Observed</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.number_observed}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Objects</div>
                    <div className="col-md-10 col-9 col-sm-8"></div>
                      <div className="col-md-2 col-3 col-sm-4 font-weight-bold">&#9500; Type</div>
                      <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.objects[2].type}</div>
                      <div className="col-md-2 col-3 col-sm-4 font-weight-bold">&#9500; Source IP</div>
                      <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.objects[0].value}</div>
                      <div className="col-md-2 col-3 col-sm-4 font-weight-bold">&#9500; Destination IP</div>
                      <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.objects[1].value}</div>
                      <div className="col-md-2 col-3 col-sm-4 font-weight-bold">&#9500; Destination Port</div>
                      <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.objects[2].dst_port}</div>
                      <div className="col-md-2 col-3 col-sm-4 font-weight-bold">&#9500; Protocol</div>
                      <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.objects[2].protocols[0] + ' - ' + this.state.selectedData.objects[2].protocols[1]}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Created</div>
                    <div className="col-md-10 col-9 col-sm-8">: {String(new Date(this.state.selectedData.created).toDateString())}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Modified</div>
                    <div className="col-md-10 col-9 col-sm-8">: {String(new Date(this.state.selectedData.modified).toDateString())}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 col-sm-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Observed Data</h4>
                </div>
                <div className="card-body">
                  <ReactTable
                    columns={[
                      {
                        Header: "ID",
                        accessor: "id",
                        Cell: row => (
                          <div className="rt-td-link" onClick={this.handleClickId.bind(this, row.original)}>{row.value}</div>
                        ),
                        minWidth: 200
                      },
                      {
                        Header: "Number Observed",
                        accessor: "number_observed"
                      },
                      {
                        Header: "Created",
                        id: "created",
                        accessor: d => String(new Date(d.created).toDateString())
                      },
                      {
                        Header: "Modified",
                        id: "modified",
                        accessor: d => String(new Date(d.modified).toDateString())
                      },
                      {
                        Header: "First Observed",
                        id: "first_observed",
                        accessor: d => String(new Date(d.first_observed).toDateString())
                      },
                      {
                        Header: "Last Observed",
                        id: "last_observed",
                        accessor: d => String(new Date(d.last_observed).toDateString())
                      },
                    ]}
                    data={this.state.observedDatas.data}
                    pages={this.state.observedDatas.pages}
                    loading={this.state.observedDatas.loading}
                    manual
                    filterable
                    onFetchData={this.fetchData}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }
  }
}

export default ObservedData;