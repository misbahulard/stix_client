/**
 * Bundle.js berfungsi sebagai container Bundle
 */
import React, { Component } from 'react';

import axios from 'axios';
import { 
  API_URL_BUNDLES, 
  setHeader, 
  getToken 
} from '../../api';

import StixGraph from './StixGraph';

import ReactTable from "react-table";
import "../../css/custom-react-table.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * Class yang mewakili komponen Bundle
 */
class Bundle extends Component {

  /**
   * Membuat Bundle
   * @param {any} props - berisi properti yang diturunkan dari parent
   */
  constructor(props) {
    super(props);

    this.state = {
      elementRef: null,
      elementSize: {
        width: 0,
        height: 0
      },
      bundles: {
        data: [],
        pages: null,
        loading: false
      },
      selectedBundle: null,
      selectedNode: null,
      legend: null,
      isLoading: true,
      error: null
    }

    this.handleSelectNode = this.handleSelectNode.bind(this);
    this.handleClickId = this.handleClickId.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  /**
   * Berfungsi sebagai callback dari reference elemen DOM
   * Untuk mengukur tinggi dan lebar dari elemen DOM dan melakukan perubahan pada state
   */
  refCallback = element => {
    if (element) {
      var el = element.getBoundingClientRect();
      this.setState({
        elementRef: element,
        elementSize: {
          width: el.width - 80,
          height: el.height + 150 
        }
      })
    }
  }

  /**
   * handle Click pada node graf
   * berfungsi untuk merubah kondisi state data selectedNode untuk merubah informasi node
   * @param {object} data - object di bundle
   */
  handleSelectNode(data) {
    this.setState({
      selectedNode: this.normalizeObject(data)
    });
  }

  /**
   * handle Click id pada object bundle
   * berfungsi untuk merubah kondisi state data bundle yang dipilih pengguna
   * @param {object} data - object bundle
   */
  handleClickId(data) {
    this.setState({
      selectedBundle: data
    });
  }

  /**
   * nomrmalisasi object dengan cara menghilangkan informasi yang tidak penting
   * @param {object} data - object bundle
   */
  normalizeObject(data) {
    var clearedObj = Object.assign({}, data)
    delete clearedObj["fx"];
    delete clearedObj["fy"];
    delete clearedObj["vx"];
    delete clearedObj["vy"];
    delete clearedObj["x"];
    delete clearedObj["y"];
    delete clearedObj["index"];

    return clearedObj;
  }

  /**
   * dapatkan legenda dari object bundle
   * legenda berupa icon dan nama objectnya
   * @param {object} data - object bundle
   */
  getLegend(data) {
    var legend = [];
    var objects = data.objects;
      objects.forEach(item => {
        if (item['type'] !== 'relationship') {
          var exist = legend.some(el => el.name === item.type);
          if (!exist) {
            var icon = "stix2_" + item.type.replace(/\-/g, '_') + "_icon_tiny_round_v1.png";
            legend.push({name: item.type, icon: icon});
          }
        }
      });

    return legend;
  }

  /**
   * bergungsi untuk memanggil api dengan parameter dari kondisi state react table
   * seperti: page, page size, sorted, filtered
   * @param {object} state - object state dari react table
   * @param {object} instance - object instance dari react table
   */
  fetchData(state, instance) {
    this.setState({
      bundles: {
        loading: true
      }
    })

    axios.post(API_URL_BUNDLES, {
      offset: state.page,
      limit: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered
    })
      .then(result => {
        this.setState({
          bundles: {
            data: result.data.data,
            pages: result.data.size,
            loading: false
          },
          selectedBundle: result.data.data[0],
          selectedNode: this.normalizeObject(result.data.data[0].objects[0]),
          legend: this.getLegend(result.data.data[0]),
          isLoading: false
        })
      })
      .catch(error => this.setState({
          error,
          isLoading: false
        }));
  }

  /**
   * saat komponen mendapat update 
   * maka lakukan perubahan pada kondisi ukuran elemen untuk merubah ukuran container SVG Graph STIX
   * @param {object} prevProps - property sebelumnya 
   * @param {*} prevState - state sebelumnya
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.elementSize.width !== prevState.elementSize.width) {
      var el = this.state.elementRef.getBoundingClientRect();
      this.setState({
        elementSize: {
          width: el.width - 80,
          height: el.height + 150
        }
      })
    }
  }

  /**
   * Saat komponen di-mount
   * Cek apakah di url terdapat parameter id,
   * jika ada maka panggil API bundle dengan ID bundle yang spesifik,
   * jika tidak maka panggil API bundle langsung
   */
  componentDidMount() {
    // call bundle
    setHeader(getToken())

    if (this.props.match.params.id) {
      var id = this.props.match.params.id;
      axios.get(API_URL_BUNDLES + "/" + id)
        .then(result => {
          this.setState({
            bundles: {
              data: result.data,
              pages: 1,
              loading: false
            },
            selectedBundle: result.data,
            selectedNode: this.normalizeObject(result.data.objects[0]),
            legend: this.getLegend(result.data),
            isLoading: false
          })
        })
        .catch(error => this.setState({
            error,
            isLoading: false
          }));
    } else {
      axios.post(API_URL_BUNDLES)
        .then(result => {
          this.setState({
            bundles: {
              data: result.data.data,
              pages: result.data.size,
              loading: false
            },
            selectedBundle: result.data.data[0],
            selectedNode: this.normalizeObject(result.data.data[0].objects[0]),
            legend: this.getLegend(result.data.data[0]),
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
    var singleBundle = false;
    if (this.props.match.params.id) {
      singleBundle = true;
    }

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
            { singleBundle ? 
              <span>
                <FontAwesomeIcon icon={ faChevronLeft } size="2x" color="#34395e" style={{ marginRight: "15px", cursor: "pointer"}} onClick={e => this.props.history.push("/")}/>
                <h1>Bundle {this.props.match.params.id}</h1>
              </span>
              : 
              <h1>Bundle</h1> 
            }
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12 col-sm-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Recent Bundle Visualization</h4>
                </div>
                <div className="card-body" ref={this.refCallback}>
                  <StixGraph data={this.state.selectedBundle} size={this.state.elementSize} handleSelectNode={this.handleSelectNode} />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-12 col-sm-12">
              <div className="card card-warning">
                <div className="card-header">
                  <h4>Legend</h4>
                </div>
                <div className="card-body"> 
                  <div className="row">
                    { this.state.legend.map((item, index) => {
                      return (
                        <div className="col-lg-6 col-md-6 col-6 col-sm-12" key={index}>
                          <div className="media">
                            <img alt={item.icon} src={"/img/icons/" + item.icon} width="30" className="rounded-circle mr-2"></img>
                            <p>{item.name}</p>
                          </div>
                        </div>
                      )  
                    })}
                  </div>
                </div>
              </div>
              <div className="card card-info">
                <div className="card-header">
                  <h4>Selected Node</h4>
                </div>
                <div className="card-body">             
                <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-md">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          { Object.keys(this.state.selectedNode).map((key) => {
                              return (
                                <tr key={key}>
                                  <td>{key}</td>
                                  <td>{String(this.state.selectedNode[key])}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* if is not single bundle render an table */}
          { singleBundle ? null :
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Bundles Data</h4>
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
                          Header: "Type",
                          accessor: "type"
                        },
                        {
                          Header: "Objects",
                          id: "objects",
                          accessor: d => "[ objects ]",
                        },
                        {
                          Header: "Spec Version",
                          accessor: "spec_version"
                        }
                      ]}
                      data={this.state.bundles.data}
                      pages={this.state.bundles.pages}
                      loading={this.state.bundles.loading}
                      manual
                      filterable
                      onFetchData={this.fetchData}
                      defaultPageSize={10}
                      className="-striped -highlight"
                      SubComponent={row => {
                        return (
                          <div style={{ padding: "20px" }}>
                          <h6 className="text-center">Bundle object details</h6>
                            
                            <ReactTable 
                              data={row.original.objects}
                              columns={[
                                {
                                  Header: "Modified",
                                  id: "modified",
                                  accessor: d => String(new Date(d.modified).toDateString())
                                },
                                {
                                  Header: "ID",
                                  accessor: "id"
                                },
                                {
                                  Header: "Type",
                                  accessor: "type"
                                },
                                {
                                  Header: "Name",
                                  id: "name",
                                  accessor: d => {
                                    if (d.name != null) {
                                      return d.name;
                                    } else {
                                      return "-";
                                    }
                                  }
                                }
                              ]}
                              minRows={0}
                              showPagination={false}
                              className="-striped -highlight"
                            />
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          
        </section>
      )
    }
  }
}

export default Bundle;