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
import {Redirect} from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
// core components
import nowLogo from "../assets/img/Stimson_Logo.png";
import bgImage from "../assets/img/Stimson_Background.jpg";
import {verifyEmail, verifyPassword} from "../Utils";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false,
      email: null,
      emailConforms: false,
      password: null,
      passwordConforms: false,
      authenticated: false
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
    const {login, register} = this.state;
    if (login) {
      return (<Redirect push to="/admin/curate"/>);
    }
    if (register) {
      return (<Redirect push to="/auth/register-page"/>);
    }
  }

  // required callback for wizard steps
  isValidated() {
    const {emailConforms, passwordConforms} = this.state;
    if (emailConforms && passwordConforms) {
      this.setState({login: true, authenticated: true});
      return true;
    }
    return false;
  }

  handleChange(event, stateName) {
    switch (stateName) {
      case "email":
        this.setState({[stateName + "Conforms"]: verifyEmail(event.target.value)});
        break;
      case "password":
        this.setState({[stateName + "Conforms"]: verifyPassword(event.target.value)});
        break;
      default:
        break;
    }
    this.setState({[stateName]: event.target.value});
  }

  render() {
    const {emailConforms, passwordConforms} = this.state;
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
                        <img src={nowLogo} alt="now-logo"/>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border form-control-lg " +
                          (this.state.emailFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id={'email'}
                          type="text"
                          placeholder="email"
                          onFocus={e => this.setState({emailFocus: true})}
                          onBlur={e => this.setState({emailFocus: false})}
                          onChange={event => this.handleChange(event, "email", "length", 8)}
                        />
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border form-control-lg " +
                          (this.state.passwordFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id={'current-password'}
                          type="password"
                          disabled={!emailConforms}
                          placeholder="Password"
                          onFocus={e => this.setState({passwordFocus: true})}
                          onBlur={e => this.setState({passwordFocus: false})}
                          onChange={event => this.handleChange(event, "password")}
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
                        disabled={!emailConforms || !passwordConforms}
                        onClick={() => this.isValidated()}
                      >
                        Sign In
                      </Button>
                      <div className="pull-left">
                        <h6>
                          <a
                            href="#pablo"
                            className="link footer-link"
                            onClick={e => this.setState({register: true})}
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
          style={{backgroundImage: "url(" + bgImage + ")"}}
        />
      </>
    );
  }
}

export default LoginPage;
