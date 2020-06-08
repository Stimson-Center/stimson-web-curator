// https://www.google.com/advanced_search
import React, {Component} from "react";
// react component for creating dynamic tables
// reactstrap components
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
import axios from "axios";
import {isEmpty} from "../../Utils";
// https://react-icons.github.io/react-icons/icons?name=fa
// core components

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOfTheseWords: null,
      exactWordOrPhrase: null,
      anyOfTheseWords: null,
      noneOfTheseWordsOrPhrases: null,
      numbersRangingFrom: null,
      numbersRangingTo: null,
      language: "any",
      countryName: "any",
      siteOrDomain: null,
      termsAppearing: null,
      fileType: null,
      languages: {},
      countries: {}
    };
    this.generateLanguageMenuItems = this.generateLanguageMenuItems.bind(this);
    this.generateCountryMenuItems = this.generateCountryMenuItems.bind(this);
  }

  componentDidMount() {
    // console.log("Curate Step1: componentDidMount");
    axios.get("http://localhost:5000/languages")
      .then(response => {
        // console.log('Curate Step2: response.data=' + JSON.stringify(response.data, null, 2));
        const results = response.data;
        if (results != null && !isEmpty(results)) {
          this.setState({languages: results});
        }
      }).catch(error => {
      // catch and print the error
      console.log(error);
    });
    axios.get("http://localhost:5000/countries")
      .then(response => {
        // console.log('Curate Step2: response.data=' + JSON.stringify(response.data, null, 2));
        const results = response.data;
        if (results != null && !isEmpty(results)) {
          this.setState({countries: results});
        }
      }).catch(error => {
      // catch and print the error
      console.log(error);
    });
  }

  isValidated() {
    const {allOfTheseWords} = this.state;
    return (allOfTheseWords !== null && allOfTheseWords.length > 2);
  }

  generateLanguageMenuItems() {
    const {languages} = this.state;
    let languageNames = [];
    // https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    Object.keys(languages).forEach(function(key) {
      languageNames.push(languages[key]);
    });
    // https://stackoverflow.com/questions/44364502/how-to-set-selected-item-in-reactstrap-dropdown
    // noinspection JSUnusedLocalSymbols
    return languageNames.map((languageName, languageIndex) => (
      <DropdownItem key={languageName} onClick={e => this.setState({language: e.currentTarget.textContent})}>{languageName}</DropdownItem>
    ))
  }


  generateCountryMenuItems() {
    const {countries} = this.state;
    let countryNames = [];
    // https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    Object.keys(countries).forEach(function(key) {
      // console.log("Countries[key]=" + key);
      countryNames.push(key);
    });
    // https://stackoverflow.com/questions/44364502/how-to-set-selected-item-in-reactstrap-dropdown
    return countryNames.map((countryName, countryNameIndex) => (
      <DropdownItem key={countryName} onClick={e => this.setState({countryName: e.currentTarget.textContent})}>{countryName}</DropdownItem>
    ))
  }

  render() {
    // noinspection JSUnusedLocalSymbols
    const {language, countryName} = this.state;
    // console.log("language=" + language);
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
                            onChange={e => this.setState({exactWordOrPhrase: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="4">Any of these words::</Label>
                      <Col sm="8">
                        <FormGroup>
                          <Input
                            placeholder='miniature OR standard'
                            type="text"
                            name="phrase"
                            onChange={e => this.setState({anyOfTheseWords: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="4">None of these words or phrases:</Label>
                      <Col sm="8">
                        <FormGroup>
                          <Input
                            placeholder='-rodent, -"Jack Russell"'
                            type="text"
                            name="phrase"
                            onChange={e => this.setState({siteOrDomain: e.target.value})}
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
                            onChange={e => this.setState({noneOfTheseWordsOrPhrases: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="2">Numbers ranging:</Label>
                      <Col sm="5">
                        <FormGroup>
                          <Input
                            placeholder='10..35 lb, $300..$500, 2010..2011'
                            type="text"
                            name="phrase"
                            onChange={e => this.setState({numbersRangingFrom: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="5">
                        <FormGroup>
                          <Input
                            placeholder='10..35 lb, $300..$500, 2010..2011'
                            type="text"
                            name="phrase"
                            onChange={e => this.setState({numbersRangingTo: e.target.value})}
                          />
                        </FormGroup>
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
                            <DropdownItem onClick={e => this.setState({language: e.currentTarget.textContent})}>Any</DropdownItem>
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
                            {countryName}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownMenu>
                              <DropdownItem onClick={e => this.setState({countryName: e.currentTarget.textContent})}>Any</DropdownItem>
                              {this.generateCountryMenuItems()}
                            </DropdownMenu>
                          </DropdownMenu>
                        </UncontrolledDropdown>
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
