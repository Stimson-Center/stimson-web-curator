import React from "react";
// reactstrap components
import {Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";
import Cookies from "universal-cookie";

// core components


class Step1 extends React.Component {
  constructor(props) {
    super(props);
    // console.log("Step1 props=" + JSON.stringify(props));
    this.state = {
      url: null,
      urlState: null,
      urlFocus: null
    };
    this.urlChange = this.urlChange.bind(this);
  }

  //
  componentDidMount() {
    // console.log("Step1: componentDidMount");
    const cookies = new Cookies();
    const cleanse_url = cookies.get("cleanse_url");
    if (cleanse_url !== undefined) {
      this.setState({
        url: cleanse_url,
        urlState: " has-success",
        urlFocus: true
      });
      cookies.remove("cleanse_url");
    }
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
                (this.state.urlState ? this.state.urlState : null) +
                (this.state.urlFocus ? " input-group-focus" : null)
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="now-ui-icons text_caps-small"/>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                defaultValue={this.state.url}
                type="url"
                placeholder="URL (required)"
                name="url"
                onFocus={e => this.setState({urlFocus: true})}
                onBlur={e => this.setState({urlFocus: false})}
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
