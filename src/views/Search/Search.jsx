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
import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";

const dataTable = [
  ["61", "FOREIGN ILLEGAL, UNREPORTED, AND UNREGULATED FISHING IN SOMALI WATERS PERPETUATES CONFLICT", "https://securefisheries.org/foreign-iuu-fishing-somali-waters-conflict"],
  ["63", "HOW RAMPANT ILLEGAL FISHING IS DESTABILIZING SOMALIA", "https://securefisheries.org/news/illegal-fishing-destabilizing-somalia"],
  ["66", "NEWS & EVENTS", "https://securefisheries.org/news"],
  ["22", "NOAA Fisheries report identifies IUU in Ecuador, Mexico, South Korea", "https://www.seafoodsource.com/news/environment-sustainability/noaa-fisheries-report-identifies-iuu-in-ecuador-mexico-south-korea"],
  ["33", "Illegal, Unreported, and Unregulated Fishing", "https://www.state.gov/key-topics-office-of-marine-conservation/illegal-unreported-and-unregulated-fishing"],
  ["61", "Illegal fishing - Fisheries - European Commission", "https://ec.europa.eu/fisheries/cfp/illegal_fishing_en"],
  ["59", "EIGHT REASONS YOU CARE ABOUT IUU FISHING – YOU JUST DON’T KNOW IT YET", "https://securefisheries.org/news/reasons-care-iuu-fishing"]
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

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataTable.map((prop, key) => {
        return {
          id: key,
          score: prop[0],
          name: prop[1],
          position: prop[2],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked LIKE button on  \n{ \n" +
                    "Score: " +
                    obj.score +
                    "Name: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    "\n}."
                  );
                }}
                className="btn-icon btn-round"
                color="info"
                size="sm"
              >
                <i className="fa fa-heart" />
              </Button>{" "}
              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked EDIT button on  \n{ \n" +
                    "Score: " +
                    obj.score +
                    "Name: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    "\n}."
                  );
                }}
                className="btn-icon btn-round"
                color="warning"
                size="sm"
              >
                <i className="fa fa-edit" />
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
                      console.log(data);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                className="btn-icon btn-round"
                color="danger"
                size="sm"
              >
                <i className="fa fa-times" />
              </Button>{" "}
            </div>
          )
        };
      })
    };
  }

  render() {
    return (
      <>
        <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title">Keyword Search for Articles</h2>
              <p className="category">
                <form>
                  <InputGroup className="no-border">
                    <Input placeholder="Search..." />

                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_zoom-bold" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </p>

            </div>
          }
        />
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
                        Header: "Score",
                        accessor: "score",
                        width: getColumnWidth(this.state.data, 'accessor', 'score')
                      },
                      {
                        Header: "Name",
                        accessor: "name",
                        width: 600
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

export default Search;
