/*!

=========================================================
* Now UI Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, {Component} from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { FaBinoculars } from 'react-icons/fa'; // https://react-icons.github.io/react-icons/icons?name=fa
// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";

const dataTable = [
  ["1", "FOREIGN ILLEGAL, UNREPORTED, AND UNREGULATED FISHING IN SOMALI WATERS PERPETUATES CONFLICT", "https://securefisheries.org/foreign-iuu-fishing-somali-waters-conflict"],
  ["2", "HOW RAMPANT ILLEGAL FISHING IS DESTABILIZING SOMALIA", "https://securefisheries.org/news/illegal-fishing-destabilizing-somalia"],
  ["3", "NEWS & EVENTS", "https://securefisheries.org/news"],
  ["4", "NOAA Fisheries report identifies IUU in Ecuador, Mexico, South Korea", "https://www.seafoodsource.com/news/environment-sustainability/noaa-fisheries-report-identifies-iuu-in-ecuador-mexico-south-korea"],
  ["5", "Illegal, Unreported, and Unregulated Fishing", "https://www.state.gov/key-topics-office-of-marine-conservation/illegal-unreported-and-unregulated-fishing"],
  ["6", "Illegal fishing - Fisheries - European Commission", "https://ec.europa.eu/fisheries/cfp/illegal_fishing_en"],
  ["7", "EIGHT REASONS YOU CARE ABOUT IUU FISHING – YOU JUST DON’T KNOW IT YET", "https://securefisheries.org/news/reasons-care-iuu-fishing"]
];

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

class Curate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cleanse_url: null,
      query: null,
      queryFocus: true,
      data: dataTable.map((prop, key) => {
        return {
          id: key,
          rank: prop[0],
          title: prop[1],
          url: prop[2],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                //   alert(
                //     "You've clicked LIKE button on  \n{ \n" +
                //     "Rank: " +
                //     obj.rank +
                //     "Title: " +
                //     obj.title +
                //     ", \nurl: " +
                //     obj.url +
                //     "\n}."
                //   );
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
                  // alert(
                  //   "You've clicked EDIT button on  \n{ \n" +
                  //   "Rank: " +
                  //   obj.rank +
                  //   "Title: " +
                  //   obj.title +
                  //   ", \nurl: " +
                  //   obj.url +
                  //   "\n}."
                  // );
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
    };
  }

  componentDidMount() {
    // console.log("Curate: componentDidMount");
    const {cleanse_url} = this.state;
    if (cleanse_url !== null) {
      this.setState({cleanse_url: null});
    }
  }

  handleSearch() {
    const { query } = this.state;
    if (query) {

    }
  }

  // https://medium.com/p/4de5e517354a/responses/show
  renderRedirect = () => {
    const {cleanse_url} = this.state;
    if (cleanse_url) {
      const cookies = new Cookies();
      let d = new Date();
      const minutes = 10;
      d.setTime(d.getTime() + (minutes*60*1000));
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
        {this.renderRedirect()}
        <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title">Curate Articles</h2>
              <p className="category">
              </p>

            </div>
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <form>
                    <InputGroup className="no-border">
                      <Input
                        placeholder="Search..."
                        defaultValue={this.state.url}
                        type="url"
                        placeholder="Search"
                        name="search"
                        onFocus={e => this.setState({queryFocus: true})}
                        onBlur={e => this.setState({queryFocus: false})}
                        onChange={e => this.setState({query: e.target.value})}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <Button
                            onClick={() => this.handleSearch()}
                            className="btn-icon btn-round"
                            color="info"
                            size="sm"
                          >
                            <i className="now-ui-icons ui-1_zoom-bold"/>
                          </Button>{" "}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </form>
                </CardHeader>
              </Card>
              <Card>
                <CardBody>
                  <ReactTable
                    data={this.state.data}
                    filterable
                    columns={[
                      {
                        Header: "Rank",
                        accessor: "rank",
                        width: getColumnWidth(this.state.data, 'accessor', 'rank')
                      },
                      {
                        Header: "Title",
                        accessor: "title"
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

export default Curate;
