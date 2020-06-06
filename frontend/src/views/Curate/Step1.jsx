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
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
// https://react-icons.github.io/react-icons/icons?name=fa
// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx"

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cleanse_url: null,
      query: null,
      queryFocus: true,
    };
  }

  componentDidMount() {
    // console.log("Curate Step1: componentDidMount");
    const {query} = this.state;
    if (query !== null) {
      this.setState({query: null, queryFocus: true});
    }
  }

  isValidated() {
    const { query } = this.state;
    return (query !== null && query.length > 2);
  }

  render() {
    // noinspection JSUnusedLocalSymbols
    const {query} = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  {/*<form>*/}
                    <InputGroup className="no-border">
                      <Input
                        placeholder="Enter Your Search Keywords..."
                        defaultValue={query}
                        type="text"
                        name="search"
                        onFocus={e => this.setState({queryFocus: true})}
                        onBlur={e => this.setState({queryFocus: false})}
                        onChange={e => this.setState({query: e.target.value})}
                      />
                    </InputGroup>
                  {/*</form>*/}
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Step1;
