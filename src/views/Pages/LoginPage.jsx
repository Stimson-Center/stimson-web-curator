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
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button
} from "reactstrap";

// core components
import nowLogo from "assets/img/Stimson_Logo.png";

import bgImage from "assets/img/Stimson_Background.jpg";
import {Redirect} from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false
    };
  }
  componentDidMount() {
    document.body.classList.add("login-page");
  }
  componentWillUnmount() {
    document.body.classList.remove("login-page");
  }
  // https://medium.com/p/4de5e517354a/responses/show
  renderRedirect = () => {
    const { login, register } = this.state;
    if (login) {
      return (<Redirect push to="/admin/search" />);
    }
    if (register) {
      return (<Redirect push to="/auth/register-page" />);
    }
  }
  render() {
    return (
      <>
        {this.renderRedirect()}
        <div className="content">
          <div className="login-page">
            <Container>
              <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
                <Form>
                  <Card className="card-login card-plain">
                    <CardHeader>
                      <div className="logo-container">
                        <img src={nowLogo} alt="now-logo" />
                      </div>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border form-control-lg " +
                          (this.state.firstnameFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="First Name..."
                          onFocus={e => this.setState({ firstnameFocus: true })}
                          onBlur={e => this.setState({ firstnameFocus: false })}
                        />
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border form-control-lg " +
                          (this.state.lastnameFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Last Name..."
                          onFocus={e => this.setState({ lastnameFocus: true })}
                          onBlur={e => this.setState({ lastnameFocus: false })}
                        />
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        color="primary"
                        size="lg"
                        href="#pablo"
                        className="mb-3 btn-round"
                        onClick={e => this.setState({login:true})}
                      >
                        Get Started
                      </Button>
                      <div className="pull-left">
                        <h6>
                          <a
                            href="#pablo"
                            className="link footer-link"
                            onClick={e => this.setState({register:true})}
                          >
                            Create Account
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a href="#pablo" className="link footer-link">
                            Need Help?
                          </a>
                        </h6>
                      </div>
                    </CardFooter>
                  </Card>
                </Form>
              </Col>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />
      </>
    );
  }
}

export default LoginPage;
