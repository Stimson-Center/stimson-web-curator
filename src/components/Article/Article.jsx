import React, {useEffect, useState} from 'react';
// reactstrap components
import {Progress} from "reactstrap";
import axios from "axios";
import {getScraperBaseUrl, sleep} from '../../Utils';

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}


// https://reactnavigation.org/docs/en/params.html
export function Article({...props}) {
  const [article, setArticle] = useState({workflow: []});

  const url = props.url;
  const language = props.language;
  const translate = props.translate;
  const final_step = translate ? "TRANSLATED" : "NLPED";
  // https://medium.com/swlh/how-to-use-useeffect-on-server-side-654932c51b13
  useEffect(() => {
    const fetchData = async () => {
      // console.log("In Article fetchData workflow=" + JSON.stringify(article.workflow));
      if (url !== null && article.workflow.length === 0) {
        const scraperApiUrl = getScraperBaseUrl().concat(encodeURI('/article?url=' + url + '&language=' + language));
        let response = await axios.get(scraperApiUrl);
        setArticle(response.data); // causes useEffect() to be called again
      } else if (article.url) {
        let response = null;
        let scraperApiUrl = null;
        if (!article.workflow.includes("DOWNLOADED")) {
          await sleep(1000);
          scraperApiUrl = getScraperBaseUrl().concat('/article/download');
          response = await axios.post(scraperApiUrl, article);
          setArticle(response.data); // causes useEffect() to be called again
        }
        else if (!article.workflow.includes("PARSED")) {
          await sleep(1000);
          scraperApiUrl = getScraperBaseUrl().concat('/article/parse');
          response = await axios.post(scraperApiUrl, article);
          setArticle(response.data); // causes useEffect() to be called again
        } else if (!article.workflow.includes(final_step)) {
          await sleep(1000);
          if (translate && !article.workflow.includes("TRANSLATED")) {
            scraperApiUrl = getScraperBaseUrl().concat('/article/translate');
            response = await axios.post(scraperApiUrl, article)
          } else {
            const scraperApiUrl = getScraperBaseUrl().concat('/article/nlp');
            response = await axios.post(scraperApiUrl, article)
          }
          setArticle(response.data); // causes useEffect() to be called again
        }
        if (article.workflow.includes(final_step)) {
          notify(props.onProgress, {article: article});
        }
      }
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }); // Empty array ensures that effect is only run on mount and unmount

  let progressText = 'Initialization should be brief';
  let progressPercent = 0;
  if (article.workflow.includes('INIT')) {
    progressPercent = 20
    progressText = 'Downloading can take a minute';
  }
  if (article.workflow.includes('DOWNLOADED')) {
    progressPercent = 40
    progressText = 'Parsing can take a minute';
  }
  if (article.workflow.includes('PARSED')) {
    progressPercent = 60
    progressText = 'Natural Language Processing can take a minute';
  }
  if (article.workflow.includes('NLPED')) {
    progressPercent = 80
    progressText = 'Translation.';
  }
  if (article.workflow.includes(final_step)) {
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
