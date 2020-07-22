import React, {Component} from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// reactstrap components
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import {FaBinoculars} from 'react-icons/fa'; // https://react-icons.github.io/react-icons/icons?name=fa
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
import axios from 'axios';
// core components
import {getScraperBaseUrl, isEmpty, isEquivalent} from "../../Utils";

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cleanse_url: null,
      query: {
        allOfTheseWords: null,
        exactTerms: null,
        orTerms: null,
        excludeTerms: null,
        lowRange: null,
        highRange: null,
        language: "any",
        country: "any",
        siteSearch: null,
        fileType: "any",
        sort: ""
      },
      data: this.handleData([[]]),
      searchResults: []
    };
    this.handleData = this.handleData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidMount() {
    // console.log("Curate Step2: componentDidMount");
    const {cleanse_url} = this.state;
    if (cleanse_url !== null) {
      this.setState({cleanse_url: null});
    }
  }

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  handleData(dataTable) {
    // noinspection UnnecessaryLocalVariableJS
    let rows = dataTable.map((prop, key) => {
      return {
        id: key,
        displayLink: prop[0],
        summary: prop[1],
        url: prop[2],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
              onClick={() => {
                let obj = this.state.data.find(o => o.id === key);
                window.open(obj.url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
              }}
              className="btn-icon btn-round"
              color="warning"
              size="sm"
            >
              <FaBinoculars/>
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => {
                let obj = this.state.data.find(o => o.id === key);
                this.setState({cleanse_url: obj.url});
              }}
              className="btn-icon btn-round"
              color="success"
              size="sm"
            >
              <i className="fa fa-heart"/>
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              onClick={() => {
                const data = this.state.data;
                data.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    data.splice(i, 1);
                    // console.log(data);
                    return true;
                  }
                  return false;
                });
                this.setState({data: data});
              }}
              className="btn-icon btn-round"
              color="danger"
              size="sm"
            >
              <i className="fa fa-times"/>
            </Button>{" "}
          </div>
        )
      };
    })
    return rows;
  }

  handleSearch = () => {
    const {query} = this.state;
    const {wizardData} = this.props;
    if (wizardData !== undefined &&
      wizardData !== null &&
      wizardData.Search !== undefined &&
      !isEquivalent(wizardData.Search, query)) {
      // any new query terms will force a render and re-execute this function
      // set up the request parameters
      let newDataTable = [];
      let start = 1;
      let payload = wizardData.Search;
      payload['start'] = start;
      // console.log('Curate Step2: query=' + JSON.stringify(newQuery, null, 2));
      const scraperApiUrl = getScraperBaseUrl().concat('/search');
      axios.post(scraperApiUrl, payload)
        .then(response => {
          const data = response.data;
          if (!isEmpty(data)) {
            data.forEach(function (d) {
              // console.log('Curate Step2: displayLink' + d.displayLink);
              newDataTable.push([d.displayLink, d.snippet, d.link]);
            });
          }
          // console.log("newDataTable=" + JSON.stringify(newDataTable, null, 2));
          this.setState({
            query: payload,
            data: this.handleData(newDataTable),
            searchResults: data
          });
        }).catch(error => {
        // catch and print the error
        console.log(error);
      });

    }
  }

  // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
  downloadCSVFileToDefaultFolder = () => {
    const {searchResults} = this.state;

    // Building the CSV from the Data two-dimensional array
    // Each column is separated by ";" and new line "\n" for next row
    let csvContent = "Domain,Snippet,Url\n";
    searchResults.forEach(function (d, index) {
      // https://stackoverflow.com/questions/2116558/fastest-method-to-replace-all-instances-of-a-character-in-a-string
      let snippet = d.snippet.replace(/,/g, ' ');
      snippet = snippet.replace(/(\r\n|\n|\r)/gm, ' ');
      // Given that you also want to cover tabs, newlines, etc, just replace \s\s+ with ' ':
      snippet = snippet.replace(/\s\s+/g, ' ');
      let row = `${d.displayLink},${snippet},${d.link}`;
      csvContent += index < searchResults.length ? row + '\n' : row;
    });

    // The download function takes a CSV string, the filename and mimeType as parameters
    // Scroll/look down at the bottom of this snippet to see how download is called
    let download = (content, fileName, mimeType) => {
      let a = document.createElement('a');
      mimeType = mimeType || 'application/octet-stream';

      if (navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new Blob([content], {
          type: mimeType
        }), fileName);
      } else if (URL && 'download' in a) { //html5 A[download]
        a.href = URL.createObjectURL(new Blob([content], {
          type: mimeType
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } // else {
      //   location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
      // }
    }
    download(csvContent, 'custom_search_results.csv', 'text/csv;encoding:utf-8');
  }

  // https://medium.com/p/4de5e517354a/responses/show
  renderRedirect = () => {
    const {cleanse_url} = this.state;
    if (cleanse_url) {
      const cookies = new Cookies();
      let d = new Date();
      const minutes = 10;
      d.setTime(d.getTime() + (minutes * 60 * 1000));
      cookies.set("cleanse_url", cleanse_url, {path: "/", expires: d});
      // https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component
      return (<Redirect push to={{
        pathname: "/admin/cleanse",
        state: {url: cleanse_url}
      }}/>);
    }
  }

  render() {
    const {searchResults} = this.state;
    return (
      <>
        {this.handleSearch()}
        {this.renderRedirect()}
        <div className="content">
          {
            searchResults.length ? (
              <Row>
                <Col xs={12} md={12}>
                  <Card>
                    <CardBody>
                      <ReactTable
                        data={this.state.data}
                        filterable
                        columns={[
                          {
                            Header: "Website",
                            accessor: "displayLink",
                          },
                          {
                            Header: "Summary",
                            accessor: "summary"
                          },
                          {
                            Header: "Actions",
                            accessor: "actions",
                            sortable: false,
                            filterable: false
                          }
                        ]}
                        defaultPageSize={10}
                        showPaginationTop
                        showPaginationBottom={false}
                        className="-striped -highlight"
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : (<div></div>)
          }
          {
            searchResults.length ? (
              <Row className="justify-content-center">
                <Col>
                  <CardBody>
                    <div className="btns-mr-5">
                      <Button
                        color="primary"
                        className="btn-round"
                        onClick={() => this.downloadCSVFileToDefaultFolder()}
                      >
                        <i className="now-ui-icons ui-2_favourite-28"/> Download Spreadsheet
                      </Button>
                    </div>
                  </CardBody>
                </Col>
              </Row>
            ) : (<div></div>)
          }
        </div>
      </>
    );
  }
}

export default Step2;
