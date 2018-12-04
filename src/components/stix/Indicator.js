/**
 * Indicator.js
 * berfungsi sebagai container Indicator
 */
import React, { Component } from 'react';

import axios from 'axios';
import { 
  API_URL_INDICATOR, 
  setHeader, 
  getToken 
} from '../../api';

import ReactTable from "react-table";
import "../../css/custom-react-table.css";

/**
 * Class yang mewakili komponen Indicator
 */
class Indicator extends Component {

  /**
   * Membuat Indicator
   * @param {any} props - berisi properti yang diturunkan dari parent
   */
  constructor(props) {
    super(props);

    this.state = {
      indicators: {
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

  /**
   * handle Click id pada object indicator
   * berfungsi untuk merubah kondisi state data indicator yang dipilih pengguna
   * @param {object} data - object indicator
   */
  handleClickId(data) {
    this.setState({
      selectedData: data
    });
  }

  /**
   * bergungsi untuk memanggil api dengan parameter dari kondisi state react table
   * seperti: page, page size, sorted, filtered
   * @param {object} state - object state dari react table
   * @param {object} instance - object instance dari react table
   */
  fetchData(state, instance) {
    this.setState({
      indicators: {
        loading: true
      }
    })

    axios.post(API_URL_INDICATOR, {
      offset: state.page,
      limit: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered
    })
      .then(result => {
        this.setState({
          indicators: {
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

  /**
   * Saat komponen di-mount
   * Cek apakah di url terdapat parameter id,
   * jika ada maka panggil API indicator dengan ID indicator yang spesifik,
   * jika tidak maka panggil API indicator langsung
   */
  componentDidMount() {
    setHeader(getToken())

    if (this.props.match.params.id) {
      var id = this.props.match.params.id;
      axios.get(API_URL_INDICATOR + "/" + id)
        .then(result => {
          this.setState({
            indicators: {
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
      axios.post(API_URL_INDICATOR)
        .then(result => {
          this.setState({
            indicators: {
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
            <h1>Indicators</h1> 
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 col-sm-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Indicator Detail</h4>
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

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Labels</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.labels}</div>

                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Pattern</div>
                    <div className="col-md-10 col-9 col-sm-8">: {this.state.selectedData.pattern}</div>
                    
                    <div className="col-md-2 col-3 col-sm-4 font-weight-bold">Valid From</div>
                    <div className="col-md-10 col-9 col-sm-8">: {String(new Date(this.state.selectedData.valid_from).toDateString())}</div>

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
                  <h4>Indicator Data</h4>
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
                    data={this.state.indicators.data}
                    pages={this.state.indicators.pages}
                    loading={this.state.indicators.loading}
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

export default Indicator;