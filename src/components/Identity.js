import React, { Component } from 'react';

import axios from 'axios';
import { 
  API_URL_IDENTITY, 
  setHeader, 
  getToken 
} from '../api';

import ReactTable from "react-table";
import "../css/custom-react-table.css";

class Identity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identities: {
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
      identities: {
        loading: true
      }
    })

    axios.post(API_URL_IDENTITY, {
      offset: state.page,
      limit: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered
    })
      .then(result => {
        this.setState({
          identities: {
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
      axios.get(API_URL_IDENTITY + "/" + id)
        .then(result => {
          this.setState({
            identities: {
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
      axios.post(API_URL_IDENTITY)
        .then(result => {
          this.setState({
            identities: {
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
            <h1>Identities</h1> 
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 col-sm-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Identity Detail</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">ID</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.id}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Type</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.type}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Name</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.name}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Description</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.description}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Identity Class</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.identity_class}</div>

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
                  <h4>Identity Data</h4>
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
                        Header: "Name",
                        accessor: "name"
                      },
                      {
                        Header: "Description",
                        accessor: "description"
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
                      }
                    ]}
                    data={this.state.identities.data}
                    pages={this.state.identities.pages}
                    loading={this.state.identities.loading}
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

export default Identity;