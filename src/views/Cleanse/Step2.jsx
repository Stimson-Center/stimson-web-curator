import React from "react";
// react plugin used to create DropdownMenu for selecting items
// reactstrap components
import {TextArea} from "@thumbtack/thumbprint-react";
// components
import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import {
  isEmpty,
  replaceNewlineWithSpace,
  isEquivalent,
  getScraperBaseUrl
} from "../../Utils";
import {Article} from "../../components/Article/Article";
import axios from "axios";

// core components

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {url: null, workflow: []},
    };
    this.currentWizardData = null;
    this.handleProgress = this.handleProgress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showArticleInProgress = this.showArticleInProgress.bind(this);
    this.showCompletedArticle = this.showCompletedArticle.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
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
    if (!article.workflow.includes('NLPED')) {
      this.render();
    }
    return article.workflow.includes('NLPED');
  }

  handleProgress(event) {
    // This function is called back from component 'Article"
    const {article} = this.state;
    if (!isEquivalent(event.article, article)) {
      // console.log("Step2: handleProgress=" + JSON.stringify(event, null, 2));
      this.setState({article: event.article});
    } else {
      this.render();
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

  downloadJsonFileToDefaultFolder = (contentType) => {
    const {article} = this.state;
    const {wizardData} = this.props;
    let languageCode = 'en';
    if (!wizardData.Download.translate) {
      languageCode = wizardData.Download.language.substring(0, 2);
    }
    // console.log("ARTICLE=" + JSON.stringify(article, null, 2));
    const filename = `${article.publish_date}_${article.title}.${languageCode}.json`;
    const content = JSON.stringify(article, null, 4);
    const blob = new Blob([content], {type: contentType});
    const url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }

  downloadPdfFileToDefaultFolder = async() => {
    const {article} = this.state;
    const {wizardData} = this.props;
    // This should be a Uint8Array or ArrayBuffer
    // This data can be obtained in a number of different ways
    // If you're running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    let languageCode = 'en';
    if (!wizardData.Download.translate) {
      languageCode = wizardData.Download.language.substring(0, 2);
    }
    // console.log("downloadPdfFileToDefaultFolder ARTICLE=" + JSON.stringify(article, null, 2));
    const scraperApiUrl = getScraperBaseUrl().concat('/pdf');
    // lost a week of time on this: https://www.thetopsites.net/article/52684083.shtml
    axios({
      method:'post',
      url:scraperApiUrl,
      responseType:'arraybuffer',
      data: article
    })
      .then(function(response) {
        let blob = new Blob([response.data], { type: 'application/pdf' } );
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${article.publish_date}_${article.title}.${languageCode}.pdf`;
        link.click();
      });
  }

  showArticleInProgress() {
    const {article} = this.state;
    if (article && article.workflow.length === 0) {
      // if (localStorage.getItem('articleUrlChanged') && article && article.workflow.length === 0) {
      // console.log("showArticleInProgress");
      // console.log("showArticleInProgress=" + JSON.stringify(article, null, 2));
      return (
        <>
          <Article
            url={this.currentWizardData.url}
            language={this.currentWizardData.language}
            translate={this.currentWizardData.translate}
            onProgress={this.handleProgress}
          />
        </>
      );
    }
  }

  showCompletedArticle() {
    const {article} = this.state;
    const summary = replaceNewlineWithSpace(article.summary);
    if (article.workflow.includes('NLPED')) {
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
                  value={!isEmpty(article) ? summary : "edit"}
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
                  rows={10}
                />
              </FormGroup>
            </Col>
          </Row>
        </>
      );
    }
  }

  finishButtonClick() {
    this.downloadJsonFileToDefaultFolder("application/json");
    this.downloadPdfFileToDefaultFolder();
  }

  resetArticle = () => {
    this.setState({article: {url: null, workflow: []}});
  }

  render() {
    const {wizardData} = this.props;
    // console.log("Step2: article=" + article + "\nwizardData.Download" + wizardData.Download);
    if (this.currentWizardData !== wizardData.Download) {
      this.currentWizardData = wizardData.Download;
      this.resetArticle();
    }
    if (isEmpty(this.currentWizardData)) {
      // noinspection CheckTagEmptyBody
      return (<div></div>);
    } else {
      // console.log("Step2: article.url=" + article.url + "\nwizardData.Download.url" + wizardData.Download.url);
      // console.log("currentWizardData=" + JSON.stringify(this.currentWizardData, null, 2));
      return (
        <>
          {this.showArticleInProgress()}
          {this.showCompletedArticle()}
        </>
      );
    }
  }
}

export default Step2;
