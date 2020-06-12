// https://www.google.com/advanced_search
import React, {Component} from "react";
// react component for creating dynamic tables
// reactstrap comsiteSearchponents
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import {countries, fileTypes, languages} from "../../variables/google";
import {getSearchYears} from "../../Utils";

// https://react-icons.github.io/react-icons/icons?name=fa
// core components

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOfTheseWords: null,
      orTerms: null,
      country: "any",
      fileType: "any",
      exactTerms: null,
      language: "any",
      excludeTerms: null,
      lowRange: "any",
      highRange: "any",
      siteSearch: null,
      sort: "relevance" // blank means sort by relevance
    };
    this.generateLanguageMenuItems = this.generateLanguageMenuItems.bind(this);
    this.generateCountryMenuItems = this.generateCountryMenuItems.bind(this);
    this.generateFileTypeMenuItems = this.generateCountryMenuItems.bind(this);
  }

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  isValidated() {
    const {allOfTheseWords} = this.state;
    return (allOfTheseWords !== null && allOfTheseWords.length > 2);
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
                    onClick={e => this.setState({language: e.currentTarget.textContent})}>{languageName}</DropdownItem>
    ))
  }


  generateCountryMenuItems() {
    let countries1 = [];
    // https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    Object.keys(countries).forEach(function (key) {
      // console.log("Countries[key]=" + key);
      countries1.push(key);
    });
    // https://stackoverflow.com/questions/44364502/how-to-set-selected-item-in-reactstrap-dropdown
    return countries1.map((country, countryIndex) => (
      <DropdownItem key={country}
                    onClick={e => this.setState({country: e.currentTarget.textContent})}>{country}</DropdownItem>
    ))
  }


  generateFileTypeMenuItems() {
    let fileTypes1 = [];
    // https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    Object.keys(fileTypes).forEach(function (key) {
      // console.log("Countries[key]=" + key);
      fileTypes1.push(key);
    });
    // https://stackoverflow.com/questions/44364502/how-to-set-selected-item-in-reactstrap-dropdown
    return fileTypes1.map((fileType, fileTypeIndex) => (
      <DropdownItem key={fileType}
                    onClick={e => this.setState({fileType: e.currentTarget.textContent})}>{fileType}</DropdownItem>
    ))
  }

  generateSearchYearsFromMenuItems() {
    return getSearchYears().map((fileType, fileTypeIndex) => (
      <DropdownItem key={fileType}
                    onClick={e => this.setState({lowRange: e.currentTarget.textContent})}>{fileType}</DropdownItem>
    ))
  }

  generateSearchYearsToMenuItems() {
    return getSearchYears().map((fileType, fileTypeIndex) => (
      <DropdownItem key={fileType}
                    onClick={e => this.setState({highRange: e.currentTarget.textContent})}>{fileType}</DropdownItem>
    ))
  }

  render() {
    // noinspection JSUnusedLocalSymbols
    const {language, country, fileType, sort, lowRange, highRange} = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardBody>
                  <Form action="/" className="form-horizontal" method="get">
                    <Row>
                      <Label sm="4">All of these words:</Label>
                      <Col sm="8">
                        <FormGroup>
                          <Input
                            placeholder="tricolor rat terrier"
                            // defaultValue="Type the important words ex:  Illegal Unregulated Unrestricted Fishing"
                            type="text"
                            name="all"
                            onChange={e => this.setState({allOfTheseWords: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="4">Exact word or phrase:</Label>
                      <Col sm="8">
                        <FormGroup>
                          <Input
                            placeholder='"rat terrier"'
                            type="text"
                            name="phrase"
                            onChange={e => this.setState({exactTerms: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="4">Any of these words:</Label>
                      <Col sm="8">
                        <FormGroup>
                          <Input
                            placeholder='miniature standard'
                            type="text"
                            name="phrase"
                            onChange={e => this.setState({orTerms: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="4">None of these words or phrases:</Label>
                      <Col sm="8">
                        <FormGroup>
                          <Input
                            placeholder='rodent "Jack Russell"'
                            type="text"
                            name="phrase"
                            onChange={e => this.setState({excludeTerms: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="4">Site or Domain:</Label>
                      <Col sm="8">
                        <FormGroup>
                          <Input
                            placeholder='wikipedia.org or domain(s) like .edu, .org or .gov'
                            type="text"
                            name="phrase"
                            onChange={e => this.setState({siteSearch: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">From Year:</Label>
                      <Col xs={12} md={4} sm={2} lg={4}>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            color="info"
                            className="btn-round btn-block"
                            caret
                          >
                            {lowRange}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={e => this.setState({lowRange: e.currentTarget.textContent})}>Any</DropdownItem>
                            {this.generateSearchYearsFromMenuItems()}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                      <Label sm="2">To Year:</Label>
                      <Col xs={12} md={4} sm={2} lg={4}>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              color="info"
                              className="btn-round btn-block"
                              caret
                            >
                              {highRange}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={e => this.setState({highRange: e.currentTarget.textContent})}>Any</DropdownItem>
                              {this.generateSearchYearsToMenuItems()}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Language:</Label>
                      <Col xs={12} md={4} sm={2} lg={4}>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            color="info"
                            className="btn-round btn-block"
                            caret
                          >
                            {language}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={e => this.setState({language: e.currentTarget.textContent})}>Any</DropdownItem>
                            {this.generateLanguageMenuItems()}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                      <Label sm="2">Country:</Label>
                      <Col xs={12} md={4} sm={2} lg={4}>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            color="info"
                            className="btn-round btn-block"
                            caret
                          >
                            {country}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={e => this.setState({country: e.currentTarget.textContent})}
                              >Any</DropdownItem>
                              {this.generateCountryMenuItems()}
                            </DropdownMenu>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                      <Label sm="2">File Type:</Label>
                      <Col xs={12} md={4} sm={2} lg={4}>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            color="info"
                            className="btn-round btn-block"
                            caret
                          >
                            {fileType}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={e => this.setState({fileType: e.currentTarget.textContent})}
                              >Any</DropdownItem>
                              {this.generateFileTypeMenuItems()}
                            </DropdownMenu>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>

                      <Label sm="2">Sort By:</Label>
                      <Col xs={12} md={4} sm={2} lg={4}>
                        <FormGroup check className="form-check-radio">
                          <Label check>
                            <Input
                              defaultValue="relevance"
                              id="relevance"
                              name="relevance"
                              type="radio"
                              checked={sort === "relevance"}
                              onChange={() => this.setState({sort: "relevance"})}
                            />
                            <span className="form-check-sign"/>
                            Relevance
                          </Label>
                          <Label check>
                            <Input
                              defaultValue="date"
                              id="date"
                              name="date"
                              type="radio"
                              checked={sort === "date"}
                              onChange={() => this.setState({sort: "date"})}
                            />
                            <span className="form-check-sign"/>
                            Date
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Step1;
