import React from 'react';
import {isEmpty} from 'Utils';
import {Article} from "../../components/Article/Article";
import {Progress} from "reactstrap";

// reactstrap components

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {progress: 0},
      threadId: 0
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
    this.handleChange = this.handleChange.bind(this);
  }

  isValidated() {
    const {article, threadId} = this.state;
    // console.log("Step2: isValidated progress=" + article.progress);
    if (article.progress < 100) {
      this.render();
    }
    return threadId !== 0 && article.progress === 100;
  }

  handleChange(event) {
    if (event.threadId > 0) {
      // console.log("Step2: handleChange=" + JSON.stringify(event, null, 2));
      this.setState({article: event.article, threadId: event.threadId});
    }
  }

  render() {
    const {wizardData} = this.props;
    const {threadId} = this.state;
    let url = null;
    if (!isEmpty(wizardData)) {
      // console.log("Step2: wizardData=" + JSON.stringify(wizardData, null, 2));
      url = wizardData.Download.url;
    }
    // console.log("Step2: render threadId=" + threadId + " progress=" + article.progress);
    if (url === null) {
      return (
        <div className="progress-container">
          <span className="progress-badge">Progress</span>
          <Progress max="100" value={0}>
            <span className="progress-value">{0}%</span>
          </Progress>
        </div>
      );
    } else {
      return (
        <>
          <Article
            url={url}
            threadId={threadId}
            onChange={this.handleChange}
          />
        </>
      );
    }
  }
}


export default Step2;
