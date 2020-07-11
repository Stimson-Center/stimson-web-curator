import React from "react";
import axios from "axios";
// react plugin used to create DropdownMenu for selecting items
// reactstrap components
import {Button, CardBody, Col, FormGroup, Input, Label, Progress, Row} from "reactstrap";
import {isEmpty, sleep, getScraperBaseUrl} from "../../Utils";
import {Article} from "../../components/Article/Article";
import {TextArea} from "@thumbtack/thumbprint-react";

// core components

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {url: null, progress: 0},
      threadId: 0
    };
    this.currentWizardData = null;
    this.handleProgress = this.handleProgress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showProgressBar = this.showProgressBar.bind(this);
    this.showStartArticle = this.showStartArticle.bind(this);
    this.showArticleInProgress = this.showArticleInProgress.bind(this);
    this.showCompletedArticle = this.showCompletedArticle.bind(this);
    this.clearCache = this.clearCache.bind(this);
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
    const {article} = this.state;
    // console.log("Step2: isValidated progress=" + article.progress);
    if (article.progress < 100) {
      this.render();
    }
    return article.progress === 100;
  }

  handleProgress(event) {
    // This function is called back from component 'Article"
    if (event.threadId > 0) {
      const {article} = this.state;
      if (event.article.progress !== article.progress) {
        // console.log("Step2: handleProgress=" + JSON.stringify(event, null, 2));
        this.setState({article: event.article, threadId: event.threadId});
      }
      // console.log("Article progress=" + event.article.progress);
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
    this.setState({article: articleUpdate})
  };

  dowloadFileToDefaultFolder = () => {
    const {article} = this.state;
    const {wizardData} = this.props;
    let languageCode = 'en';
    if (!wizardData.Download.translate) {
      languageCode = wizardData.Download.language.substring(0, 2);
    }
    // console.log("ARTICLE=" + JSON.stringify(article, null, 2));
    const filename = `${article.publish_date} ${article.title}.${languageCode}.json`;
    const content = JSON.stringify(article, null, 4);
    const blob = new Blob([content], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }

  showProgressBar(url) {
    const {article, threadId} = this.state;
    if (threadId > 0 && article.progress === 0) {
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

  showStartArticle() {
    if (localStorage.getItem('articleUrlChanged')) {
      // console.log("showStartArticle");
      return (
        <>
          <Article
            url={this.currentWizardData.url}
            language={this.currentWizardData.language}
            translate={this.currentWizardData.translate}
            threadId={0}
            onProgress={this.handleProgress}
          />
        </>
      );
    }
  }

  showArticleInProgress() {
    const {article, threadId} = this.state;
    if (threadId > 0 && article.progress > 0 && article.progress < 100) {
      // console.log("showArticleInProgress");
      sleep(1000)
      return (
        <>
          <Article
            url={this.currentWizardData.url}
            language={this.currentWizardData.language}
            translate={this.currentWizardData.translate}
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

  clearCache() {
    const {article, threadId} = this.state;
    if (article.progress === 100 && threadId > 0) {
      const scraperApiUrl = getScraperBaseUrl().concat('/article/' + threadId);
      axios.delete(scraperApiUrl);
    }
  }

  resetArticle = () => {
    this.setState({article: {url: null, progress: 0}, threadId: 0});
  }

  render() {
    const {wizardData} = this.props;
    if (this.currentWizardData !== wizardData.Download) {
      this.currentWizardData = wizardData.Download;
      this.resetArticle();
      return (<div></div>);
    }
    if (isEmpty(this.currentWizardData)) {
      // noinspection CheckTagEmptyBody
      return (<div></div>);
    } else {
      // console.log("Step2: article.url=" + article.url + "\nwizardData.Download.url" + wizardData.Download.url);
      return (
        <>
          {this.showStartArticle()}
          {this.showArticleInProgress()}
          {this.showCompletedArticle()}
          {this.clearCache()}
        </>

      );
    }
  }
}

export default Step2;
