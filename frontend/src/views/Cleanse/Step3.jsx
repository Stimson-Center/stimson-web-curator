import React from "react";
// reactstrap components
import {Button, CardBody, Col, Row} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import {isEmpty} from "../../Utils";

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null
    };
    this.hideAlert = this.hideAlert.bind(this);
    this.basicAlert = this.basicAlert.bind(this);
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
    // console.log('Cleanse Step3: basicAlert=' + JSON.stringify(this.state, null, 2));
    if (show) {
      return (
        <SweetAlert
          success
          style={{display: "block", marginTop: "50px"}}
          title={"Saved:" + show}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        />
      );
    }
  }

  hideAlert() {
    const {show} = this.state;
    if (show) {
      this.setState({show: null});
    }
  }

  handlePublishArticle() {
    // console.log("Step3 handlePublishArticle props=" + JSON.stringify(this.props));
    const {show} = this.state;
    const {wizardData} = this.props;
    // noinspection JSUnresolvedVariable
    if (!isEmpty(wizardData) && !isEmpty(wizardData.Review) && !show) {
      // noinspection JSUnresolvedVariable
      const article = wizardData.Review.article;
      axios.post("http://localhost:5000/share", article)
        .then(response => {
          // console.log('Cleanse Step3: response.data=' + JSON.stringify(response.data, null, 2));
          const article = response.data;
          if (article != null && !isEmpty(article) && !show) {
            this.setState({show: article.filepath});
          }
        }).catch(error => {
        // catch and print the error
        console.log(error);
      });
    }
  }

  render() {
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
            {this.basicAlert()}
          </Col>
        </Row>
      </>
    );
  }
}

export default Step3;
