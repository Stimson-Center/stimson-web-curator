import React, {useEffect, useState} from 'react';
// reactstrap components
import {Progress} from "reactstrap";
import axios from "axios";
import {getScraperBaseUrl, isEquivalent} from '../../Utils';

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}


// https://reactnavigation.org/docs/en/params.html
export function Article({...props}) {
  const [article, setArticle] = useState({workflow: [], article_step: ''});

  const url = props.url;
  const language = props.language;
  const translate = props.translate;
  const final_step = translate ? "TRANSLATED" : "NLPED";
  // https://medium.com/swlh/how-to-use-useeffect-on-server-side-654932c51b13
  useEffect(() => {
    const fetchData = async () => {
      // console.log("In Article fetchData workflow=" + JSON.stringify(article.workflow));
      let response = null;
      if (url !== null && article.workflow.length === 0 && article.article_step !== 'INIT') {
        const scraperApiUrl = getScraperBaseUrl().concat(encodeURI('/article?url=' + url + '&language=' + language));
        response = await axios.get(scraperApiUrl);
        response.data.article_step = 'INIT';
      } else if (article.url) {
        let scraperApiUrl = null;
        if (!article.workflow.includes("DOWNLOADED")) {
          scraperApiUrl = getScraperBaseUrl().concat('/article/download');
          response = await axios.post(scraperApiUrl, article);
          response.data.article_step = 'DOWNLOADED';
        }
        else if (!article.workflow.includes("PARSED")) {
          scraperApiUrl = getScraperBaseUrl().concat('/article/parse');
          response = await axios.post(scraperApiUrl, article);
          response.data.article_step = 'PARSED';
        } else if (!article.workflow.includes(final_step)) {
          if (translate && !article.workflow.includes("TRANSLATED")) {
            scraperApiUrl = getScraperBaseUrl().concat('/article/translate');
            response = await axios.post(scraperApiUrl, article)
            response.data.article_step = 'TRANSLATED';
          } else {
            const scraperApiUrl = getScraperBaseUrl().concat('/article/nlp');
            response = await axios.post(scraperApiUrl, article)
            response.data.article_step = 'NLPED';
          }
        }
      }
      if (article.workflow.includes(final_step)) {
        notify(props.onProgress, {article: article});
      } else if (response && !isEquivalent(response.data, article)) {
        setArticle(response.data); // causes useEffect() to be called again (recursion) immediately!
      }
    }
    // https://www.robinwieruch.de/react-hooks-fetch-data
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, [article]); // Once the article changes, the data request should fire again.

  let progressText = 'Initialization should be brief';
  let progressPercent = 0;
  if (article.article_step === 'INIT') {
    progressPercent = 20
    progressText = 'Downloading can take a minute';
  } else if (article.article_step === 'DOWNLOADED') {
    progressPercent = 40
    progressText = 'Parsing can take a minute';
  } else if (article.article_step === 'PARSED') {
    progressPercent = 60
    progressText = 'Natural Language Processing can take a minute';
  } else if (article.article_step === 'NLPED') {
    progressPercent = 80
    progressText = 'Translation.';
  } else if (article.article_step === final_step) {
    progressPercent = 100
    progressText = 'Done.';
  }

  return (
    <div className="progress-container">
      <span className="progress-badge">Progress</span>
      <Progress max="100" value={progressPercent}>
        <span className="progress-value">{progressText} {progressPercent}%</span>
      </Progress>
    </div>
  );
}
