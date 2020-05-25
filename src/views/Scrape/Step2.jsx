
import React from 'react';
// reactstrap components

import {isEmpty} from 'Utils';
import {Article} from "../../components/Article/Article";

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

  async isValidated() {
    const {article, threadId} = this.state;
    console.log("isValidated progress=" + article.progress);
    return threadId !== 0 && article.progress === 100;
  }

  handleChange(event) {
    console.log("Step2: handleChange=" + JSON.stringify(event, null, 2));
  }

  render() {
    const {wizardData} = this.props;
    const {article, threadId} = this.state;
    let url = "";
    if (!isEmpty(wizardData) ) {
      console.log("wizardData=" + JSON.stringify(wizardData, null, 2));
      url = wizardData.Download.url;
    }
    return (
      <>
        <Article
          url={url}
          threadId={threadId}
          onChange={(event) => this.handleChange}
        />
      </>
    );
  }
}


export default Step2;
