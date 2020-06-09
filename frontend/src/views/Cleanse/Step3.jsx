import React from "react";
// reactstrap components
import {Button, CardBody, Col, Row} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import CardFooter from "reactstrap/lib/CardFooter";

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.hideAlert = this.hideAlert.bind(this);
    console.log("Step3 props=" + JSON.stringify(props));
    this.handlePublishArticle = this.handlePublishArticle.bind(this);
  }

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  basicAlert() {
    const {show} = this.state;
    if (show) {
      return (
        <SweetAlert
          success
          style={{display: "block", marginTop: "50px"}}
          title="Article Saved!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        />
      );
    }
  }

  hideAlert() {
    this.setState({
      alert: null,
      show: false
    });
  }

  handlePublishArticle() {
    console.log("Step3 handlePublishArticle");
    this.setState({show: true});
    this.basicAlert()
  }

  render() {
    const {alert} = this.state;
    console.log("Step3 render=" + JSON.stringify(this.state));
    return (
      <>
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <CardBody>
              <div className="btns-mr-5">
                <Button
                  color="primary"
                  className="btn-round"
                  onClick={() => this.handlePublishArticle()}
                >
                  Save Article to home directory <i className="now-ui-icons ui-2_favourite-28"/>
                </Button>
              </div>
            </CardBody>
            <CardFooter>
              {this.basicAlert()}
            </CardFooter>
          </Col>
        </Row>
      </>
    );
  }
}

export default Step3;
