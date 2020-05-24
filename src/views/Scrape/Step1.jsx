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
import React from "react";

// reactstrap components
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";

// core components

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      urlState: ""
    };
    this.urlChange = this.urlChange.bind(this);
  }
  urlChange(e) {
    this.setState({
      url: e.target.value
    });
    const urlRex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    if (urlRex.test(e.target.value)) {
      this.setState({
        urlState: " has-success"
      });
    } else {
      this.setState({
        urlState: " has-danger"
      });
    }
  }
  isValidated() {
    if (
      this.state.urlState !== " has-success"
    ) {
      this.setState({
        urlState: " has-danger"
      });
      return false;
    }
    return true;
  }
  render() {
    return (
      <>
        <h5 className="info-text">
          {" "}
          Enter URL of Web Site Page You Wish to Download
        </h5>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} className="mt-3">
            <InputGroup
              className={
                "form-control-lg" +
                (this.state.urlState ? this.state.urlState : "") +
                (this.state.urlFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="now-ui-icons text_caps-small" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                defaultValue={this.state.url}
                type="url"
                placeholder="URL (required)"
                name="url"
                onFocus={e => this.setState({ urlFocus: true })}
                onBlur={e => this.setState({ urlFocus: false })}
                onChange={e => this.urlChange(e)}
              />
            </InputGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default Step1;
