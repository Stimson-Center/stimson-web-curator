import React from "react";
// reactstrap components
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import Cookies from "universal-cookie";
import {languages} from "../../variables/google";
import {getKeyByValue, getValueByIndex} from "../../Utils"

// core components


class Step1 extends React.Component {
  constructor(props) {
    super(props);
    // console.log("Step1 props=" + JSON.stringify(props));
    this.state = {
      url: null,
      languageName: getKeyByValue(languages, 'en'),
      language: 'en',
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

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
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

  generateLanguageMenuItems() {
    let languageNames = [];
    // https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    Object.keys(languages).forEach(function (key) {
      languageNames.push(key);
    });
    // https://stackoverflow.com/questions/44364502/how-to-set-selected-item-in-reactstrap-dropdown
    // noinspection JSUnusedLocalSymbols
    return languageNames.map((languageName, languageIndex) => (
      <DropdownItem key={languageName}
                    onClick={e => this.setState({languageName: e.currentTarget.textContent, language: getValueByIndex(languages, languageIndex)})}>{languageName}</DropdownItem>
    ))
  }

  render() {
    const {languageName} = this.state;
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
        <Row className="justify-content-center">
          <Label sm="2">Language:</Label>
          <Col xs={12} md={4} sm={2} lg={4}>
            <UncontrolledDropdown>
              <DropdownToggle
                color="info"
                className="btn-round btn-block"
                caret
              >
                {languageName}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={e => this.setState({language: e.currentTarget.textContent})}>{languageName}</DropdownItem>
                {this.generateLanguageMenuItems()}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </>
    );
  }
}

export default Step1;
