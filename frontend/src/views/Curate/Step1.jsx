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
      language: "any language",
      region: "any region",
      siteOrDomain: null,
      termsAppearing: null,
      fileType: null
    };
  }

  componentDidMount() {
    // console.log("Curate Step1: componentDidMount");
    const {allOfTheseWords} = this.state;
    if (allOfTheseWords !== null) {
      this.setState({allOfTheseWords: null, queryFocus: true});
    }
  }

  isValidated() {
    const {allOfTheseWords} = this.state;
    return (allOfTheseWords !== null && allOfTheseWords.length > 2);
  }

  render() {
    // noinspection JSUnusedLocalSymbols
    const {allOfTheseWords} = this.state;
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
                            Dropdown
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>any language</DropdownItem>
                            <DropdownItem>English</DropdownItem>
                            <DropdownItem>Thai</DropdownItem>
                            <DropdownItem>Chinese</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                      <Label sm="2">Region:</Label>
                      <Col xs={12} md={4} sm={2} lg={4}>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            color="info"
                            className="btn-round btn-block"
                            caret
                          >
                            Dropdown
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>any region</DropdownItem>
                            <DropdownItem>United States</DropdownItem>
                            <DropdownItem>Thailand</DropdownItem>
                            <DropdownItem>China</DropdownItem>
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
