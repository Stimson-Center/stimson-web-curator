import React from "react";
import axios from "axios";
// react plugin used to create DropdownMenu for selecting items
// reactstrap components
import {Col, FormGroup, Input, Label, Progress, Row} from "reactstrap";
import {isEmpty} from "../../Utils";
import {Article} from "../../components/Article/Article";
import {TextArea} from "@thumbtack/thumbprint-react";
import {domain} from "../../variables/general";

// core components

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {progress: 0},
      threadId: 0,
      updated: false,
    };
    // console.log("props=" + JSON.stringify(props, null, 2));
    // props={
    //   "wizardData": {
    //     "Download": {
    //       "url": "https://www.yahoo.com",
    //       "urlState": " has-success",
    //       "article": {},
    //       "urlFocus": false
    //     }
    //   }
    // }
    this.handleProgress = this.handleProgress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  isValidated() {
    const {article, threadId} = this.state;
    // console.log("Step2: isValidated progress=" + article.progress);
    if (article.progress < 100) {
      this.render();
    }
    return threadId !== 0 && article.progress === 100;
  }

  handleProgress(event) {
    if (event.threadId > 0) {
      // console.log("Step2: handleProgress=" + JSON.stringify(event, null, 2));
      this.setState({article: event.article, threadId: event.threadId});
    }
  }

  handleChange(event, stateName) {

    const {article} = this.state;
    let article_update = article;
    if (Object.prototype.toString.call(event) === "[object String]") {
      article_update[stateName] = event
    } else {
      article_update[stateName] = event.target.value
    }
    this.setState({
      article: article_update,
      updated: true
    });
  };


  render() {
    let {article, threadId} = this.state;
    const {wizardData} = this.props;
    let url = null;
    if (!isEmpty(wizardData) && !isEmpty(wizardData.Download)) {
      // console.log("Step2: wizardData=" + JSON.stringify(wizardData, null, 2));
      url = wizardData.Download.url;
    }
    if (url === null) {
      return (
        <div className="progress-container">
          <span className="progress-badge">Progress</span>
          <Progress max="100" value={0}>
            <span className="progress-value">{0}%</span>
          </Progress>
        </div>
      );
    } else if (article.progress >= 0 && article.progress < 100) {
      return (
        <>
          <Article
            url={url}
            threadId={threadId}
            onProgress={this.handleProgress}
          />
        </>
      );
    } else if (article.progress === 100) {
      if (article.thread_id > 0) {
        axios({
          method: 'delete',
          baseUrl: domain,
          url: '/article/' + article.thread_id,
          headers: {
            "Authorization": "",
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .catch(err => {
            console.log(err)
          });
      }
      return (
        <>
          <h5 className="info-text"> Review / Modify Results</h5>
          <Row className="justify-content-center">
            <Col xs={12} sm={7}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={!isEmpty(article) ? article.title : "edit"}
                  onChange={event => this.handleChange(event, "title")}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={3}>
              <FormGroup>
                <Label>Publish Date</Label>
                <Input
                  type="text"
                  value={!isEmpty(article) ? article.publish_date : "edit"}
                  onChange={event => this.handleChange(event, "publish_date")}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={5}>
              <FormGroup>
                <Label>Authors</Label>
                <Input
                  type="text"
                  value={!isEmpty(article) ? article.authors : "edit"}
                  onChange={event => this.handleChange(event, "authors")}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={5}>
              <FormGroup>
                <Label>Keywords</Label>
                <Input
                  type="text"
                  value={!isEmpty(article) ? article.keywords : "enter"}
                  onChange={event => this.handleChange(event, "keywords")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10}>
              <FormGroup>
                <Label>Summary</Label>
                <TextArea
                  type="text"
                  value={!isEmpty(article) ? article.summary : "edit"}
                  onChange={event => this.handleChange(event, "summary")}
                  rows={5}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10}>
              <FormGroup>
                <Label>Text</Label>
                <TextArea
                  type="text"
                  value={!isEmpty(article) ? article.text : "enter"}
                  onChange={event => this.handleChange(event, "text")}
                />
              </FormGroup>
            </Col>
          </Row>
        </>
      );
    }
  }
}

export default Step2;
