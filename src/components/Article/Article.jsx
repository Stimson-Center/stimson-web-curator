import React, {useEffect, useState} from 'react';
// reactstrap components
import {Progress} from "reactstrap";
import axios from "axios";
import {getScraperBaseUrl, isEmpty, sleep} from '../../Utils';

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}


// https://reactnavigation.org/docs/en/params.html
export function Article({...props}) {
  const [article, setArticle] = useState({workflow: []});

  const url = props.url;
  const language = props.language;
  const translate = props.translate;
  // https://medium.com/swlh/how-to-use-useeffect-on-server-side-654932c51b13
  useEffect(() => {
    const fetchData = async () => {
      // console.log("In Article fetchData url=" + url);
      if (url !== null && article.workflow.length === 0) {
        const scraperApiUrl = getScraperBaseUrl().concat(encodeURI('/article?url=' + url + '&language=' + language + "&translate=" + translate));
        let response1 = await axios.get(scraperApiUrl);
        if (!isEmpty(response1) && !isEmpty(response1.data)) {
          // console.log("Article1: data=" + JSON.stringify(response1.data.workflow, null, 2));
          setArticle(response1.data);
        }
      }
      if (!article.workflow.includes("NLPED")) {
        await sleep(1000);
        const scraperApiUrl = getScraperBaseUrl().concat('/article');
        axios.post(scraperApiUrl, article)
          .then(response2 => {
            // console.log("Article2: data=" + JSON.stringify(response2.data.workflow, null, 2));
            setArticle(response2.data);
          })
          .catch(error => {
            console.log(error);
          })
      }
      if (article.workflow.includes("NLPED")) {
        notify(props.onProgress, {article: article});
      }
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }); // Empty array ensures that effect is only run on mount and unmount

  let progressText = 'Initialization should be brief';
  let progressPercent = 0;
  if (article.workflow.includes('INIT')) {
    progressPercent = 25
    progressText = 'Downloading can take a minute';
  }
  if (article.workflow.includes('DOWNLOADED')) {
    progressPercent = 50
    progressText = 'Parsing can take a minute';
  }
  if (article.workflow.includes('PARSED')) {
    progressPercent = 75
    progressText = 'Natural Language Processing can take a minute';
  }
  if (article.workflow.includes('NLPED')) {
    progressPercent = 100
    progressText = 'Done.';
  }
  // console.log("progressPercent=" + progressPercent);

  return (
    <div className="progress-container">
      <span className="progress-badge">Progress</span>
      <Progress max="100" value={progressPercent}>
        <span className="progress-value">{progressText} {progressPercent}%</span>
      </Progress>
    </div>
  );
}
