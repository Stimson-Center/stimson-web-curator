import React, {Component} from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// reactstrap components
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import {FaBinoculars} from 'react-icons/fa'; // https://react-icons.github.io/react-icons/icons?name=fa
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
import axios from 'axios';
import {isEmpty, isEquivalent} from "../../Utils";
// core components


// https://github.com/tannerlinsley/react-table/issues/94
const getColumnWidth = (rows, accessor, headerText) => {
  const maxWidth = 800
  const magicSpacing = 10
  const cellLength = Math.max(
    ...rows.map(row => (`${row[accessor]}` || '').length),
    headerText.length,
  )
  return Math.min(maxWidth, cellLength * magicSpacing)
}

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
      data: this.handleData([[]])
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
                window.open(obj.url, "_blank")
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
              <i className="fa fa-thumbs-up"/>
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
              <i className="fa fa-thumbs-down"/>
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
      let newQuery = wizardData.Search;
      newQuery['start'] = start;
      // console.log('Curate Step2: query=' + JSON.stringify(newQuery, null, 2));
      axios.post("http://localhost:5000/search", newQuery)
        .then(response => {
          const data = response.data;
          if (!isEmpty(data)) {
            data.forEach(function(d){
              // console.log('Curate Step2: displayLink' + d.displayLink);
              newDataTable.push([d.displayLink, d.snippet, d.link]);
            });
          }
          // console.log("newDataTable=" + JSON.stringify(newDataTable, null, 2));
          this.setState({query: newQuery, data: this.handleData(newDataTable)});
        }).catch(error => {
        // catch and print the error
        console.log(error);
      });

    }
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
    return (
      <>
        {this.handleSearch()}
        {this.renderRedirect()}
        <div className="content">
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
        </div>
      </>
    );
  }
}

export default Step2;
