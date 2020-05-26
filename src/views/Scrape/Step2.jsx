import React from "react";
// react plugin used to create DropdownMenu for selecting items
// reactstrap components
import {Col, FormGroup, Input, Label, Row, Progress} from "reactstrap";
import {isEmpty} from "../../Utils";
import {Article} from "../../components/Article/Article";

// core components

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    const {wizardData} = props;
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

  // componentDidMount() {
  //   const {wizardData} = this.props;
  //   const {article} = this.state;
  //   if (!isEmpty(wizardData) && !isEmpty(wizardData.Progress.article) && isEmpty(article)) {
  //     // console.log("Step3 article=" + JSON.stringify(wizardData.Progress, null, 2));
  //     this.setState({article: wizardData.Progress.article});
  //   }
  // }

  isValidated() {
    const {article, threadId} = this.state;
    // console.log("Step2: isValidated progress=" + article.progress);
    if (article.progress < 100) {
      this.render();
    }
    return threadId !== 0 && article.progress === 100;
  }

  handleProgress(event) {
    const {threadId} = this.state;
    if (event.threadId > 0) {
      // console.log("Step2: handleProgress=" + JSON.stringify(event, null, 2));
      this.setState({article: event.article, threadId: event.threadId});
    }
  }

  handleChange(event, stateName) {
    // console.log(stateName + " " + event.target.value + " " + stateNameMinLength);
    let {article} = this.state;
    article[stateName] = event.target.value
    this.setState({
      [stateName]: event.target.value,
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
    } else  if (article.progress === 100) {
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
                <Label>Summary</Label>
                <Input
                  type="text"
                  value={!isEmpty(article) ? article.summary : "edit"}
                  onChange={event => this.handleChange(event, "summary")}
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
            <Col xs={12} sm={5}>
              <FormGroup>
                <Label>Text</Label>
                <Input
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
