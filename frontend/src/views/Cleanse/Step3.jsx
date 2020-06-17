import React from "react";
// reactstrap components
import {Button, CardBody, Col, Row} from "reactstrap";
import PropTypes from 'prop-types';

class Step3 extends React.Component {
  // constructor(props) {
  //   super(props);
    // this.state = {
    //   show: null
    // };
    // this.hideAlert = this.hideAlert.bind(this);
    // this.basicAlert = this.basicAlert.bind(this);
    // this.handlePublishArticle = this.handlePublishArticle.bind(this);
  // }

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  // basicAlert() {
  //   const {show} = this.state;
  //   // console.log('Cleanse Step3: basicAlert=' + JSON.stringify(this.state, null, 2));
  //   if (show) {
  //     return (
  //       <SweetAlert
  //         success
  //         style={{display: "block", marginTop: "50px"}}
  //         title={"Saved:" + show}
  //         onConfirm={() => this.hideAlert()}
  //         onCancel={() => this.hideAlert()}
  //         confirmBtnBsStyle="info"
  //       />
  //     );
  //   }
  // }
  //
  // hideAlert() {
  //   const {show} = this.state;
  //   if (show) {
  //     this.setState({show: null});
  //   }
  // }

  // handlePublishArticle() {
  //   // console.log("Step3 handlePublishArticle props=" + JSON.stringify(this.props));
  //   const {show} = this.state;
  //   const {wizardData} = this.props;
  //   // noinspection JSUnresolvedVariable
  //   if (!isEmpty(wizardData) && !isEmpty(wizardData.Review) && !show) {
  //     // noinspection JSUnresolvedVariable
  //     const article = wizardData.Review.article;
  //     axios.post("http://localhost:5000/share", article)
  //       .then(response => {
  //         // console.log('Cleanse Step3: response.data=' + JSON.stringify(response.data, null, 2));
  //         const article = response.data;
  //         if (article != null && !isEmpty(article) && !show) {
  //           this.setState({show: article.filepath});
  //         }
  //       }).catch(error => {
  //       // catch and print the error
  //       console.log(error);
  //     });
  //   }
  // }


  dowloadFileToDefaultFolder = () => {
    const {wizardData} = this.props;
    const article = wizardData.Review.article;
    // console.log("ARTICLE=" + JSON.stringify(article, null, 2));
    const filename = `${article.publish_date} ${article.title}`;
    const content = JSON.stringify(article, null, 4);
    // const utf8ByteArray = toUTF8Array(content);
    // const blob = new Blob([utf8ByteArray], {type: "application/json"});
    let lines = [];
    for (let [key, value] of Object.entries(article)) {
      lines.push(`${key}:\t${value}\n`)
    }
    const blob = new Blob(lines, {type: "application/json"});
    const url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
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
                  onClick={() => this.dowloadFileToDefaultFolder("application/json")}
                >
                  <i className="now-ui-icons ui-2_favourite-28"/> Download Article
                </Button>
              </div>
            </CardBody>
          </Col>
        </Row>
      </>
    );
  }
}

Step3.propTypes = {
  wizardData: PropTypes.object.isRequired
};

export default Step3;
