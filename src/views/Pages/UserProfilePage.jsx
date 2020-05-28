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
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  Input,
  FormGroup
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";
// core components
import PictureUpload from "../../components/CustomUpload/PictureUpload.jsx";

class UserProfile extends React.Component {
  state = {
    username: '',
    email: '',
    mobile: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  };
  // noinspection JSCheckFunctionSignatures
  async componentDidMount() {
    this.setState({
      username: "Brian Finlay",
      email: "brian@stimson.org",
      mobile: "+15555555555",
      firstName: 'Brian ',
      lastName: 'Finlay',
      address: '1211 Connecticut Ave NW 8th floor',
      city: 'Washington DC',
      country: 'USA',
      postalCode: '20036'
    });
  }

  render() {
    const {username, email, mobile, firstName, lastName, address, city, country, postalCode} = this.state;
    console.log(username);
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Company</label>
                          <Input
                            defaultValue="The Stimson Center"
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            disabled
                            defaultValue={username}
                            placeholder={username}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                            defaultValue={email}
                            placeholder={email}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Mobile Number</label>
                          <Input
                            defaultValue={mobile}
                            placeholder={mobile}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={firstName}
                            placeholder={firstName}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={lastName}
                            placeholder={lastName}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue={address}
                            placeholder={address}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue={city}
                            placeholder={city}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue={country}
                            placeholder={country}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input
                            defaultValue={postalCode}
                            placeholder={postalCode}
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={require("../../assets/img/bg5.jpg")} />
                </div>
                <CardBody>
                  <div className="author">
                    <PictureUpload />
                  </div>
                </CardBody>
                <hr />
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
