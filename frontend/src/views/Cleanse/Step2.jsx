import React from "react";
import axios from "axios";
// react plugin used to create DropdownMenu for selecting items
// reactstrap components
import {Button, CardBody, Col, FormGroup, Input, Label, Progress, Row} from "reactstrap";
import {isEmpty, sleep} from "../../Utils";
import {Article} from "../../components/Article/Article";
import {TextArea} from "@thumbtack/thumbprint-react";
import {domain} from "../../variables/general";

// core components

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {url: null, progress: 0},
      threadId: 0
    };
    this.handleProgress = this.handleProgress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    localStorage.setItem('articleUrl', null);
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
    return article.progress === 100;
  }

  handleProgress(event) {
    if (event.threadId > 0) {
      const {article} = this.state;
      if (event.article.progress !== article.progress) {
        // console.log("Step2: handleProgress=" + JSON.stringify(event, null, 2));
        this.setState({article: event.article, threadId: event.threadId});
      }
    }
  }

  handleChange(event, stateName) {
    const {article} = this.state;
    let articleUpdate = article;
    if (Object.prototype.toString.call(event) === "[object String]") {
      articleUpdate[stateName] = event
    } else {
      articleUpdate[stateName] = event.target.value
    }
  };

  dowloadFileToDefaultFolder = () => {
    const {article} = this.state;
    // console.log("ARTICLE=" + JSON.stringify(article, null, 2));
    const filename = `${article.publish_date} ${article.title}.json`;
    const content = JSON.stringify(article, null, 4);
    const blob = new Blob([content], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }

  showProgressBar(url) {
    if (url === null) {
      // console.log("showProgressBar");
      return (
        <div className="progress-container">
          <span className="progress-badge">Progress</span>
          <Progress max="100" value={0}>
            <span className="progress-value">{0}%</span>
          </Progress>
        </div>
      );
    }
  }
  showStartArticle(url, language, translate, articleUrlChanged) {
    if (articleUrlChanged) {
      // console.log("showStartArticle");
      return (
        <>
          <Article
            url={url}
            language={language}
            translate={translate}
            threadId={0}
            onProgress={this.handleProgress}
          />
        </>
      );
    }
  }

  showArticleInProgress(url, language, translate, threadId) {
    const {article} = this.state;

    if (article.progress > 0 && article.progress < 100) {
      // console.log("showArticleInProgress");
      sleep(1000)
      return (
        <>
          <Article
            url={url}
            language={language}
            translate={translate}
            threadId={threadId}
            onProgress={this.handleProgress}
          />
        </>
      );
    }
  }

  showCompletedArticle() {
    const {article} = this.state;
    if (article.progress === 100) {
      // console.log("showCompletedArticle");
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

  render() {
    const {article, threadId} = this.state;
    const {wizardData} = this.props;
    let articleUrlChanged = false;
    let url = localStorage.getItem('articleUrl');
    let language = 'en';
    let translate = false;
    if (isEmpty(wizardData) || isEmpty(wizardData.Download)) {
      return (<div></div>);
    } else {
      // console.log("Step2: article.url=" + article.url + "\nwizardData.Download.url" + wizardData.Download.url);
      if (url !== wizardData.Download.url) {
        // console.log("Step2: wizardData=" + JSON.stringify(wizardData, null, 2));
        url = wizardData.Download.url;
        language = wizardData.Download.language;
        translate = wizardData.Download.translate;
        localStorage.setItem('articleUrl', url);
        articleUrlChanged = true;
      }
      if (article.progress === 100) {
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
      }
    }
    return (
      <>
        {this.showProgressBar(url)}
        {this.showStartArticle(url, language, translate, articleUrlChanged)}
        {this.showArticleInProgress(url, language, translate, threadId)}
        {this.showCompletedArticle()}
      </>

    );
  }
}

export default Step2;
