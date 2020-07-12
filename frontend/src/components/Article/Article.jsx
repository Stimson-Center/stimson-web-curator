import React, {useEffect, useState} from 'react';
// reactstrap components
import {Progress} from "reactstrap";
import axios from "axios";
import {getScraperBaseUrl, isEmpty, isEquivalent, sleep} from 'Utils';

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

// https://reactnavigation.org/docs/en/params.html
// export const Article = (urlObj, threadIdObj) => {
export function Article({...props}) {
  const [article, setArticle] = useState({progress: 0});
  const [threadId, setThreadId] = useState(props.threadId);

  const url = props.url;
  const language = props.language;
  const translate = props.translate;
  // https://medium.com/swlh/how-to-use-useeffect-on-server-side-654932c51b13
  useEffect(() => {
    const fetchData = async () => {
      // console.log("In Article fetchData url=" + url + " threadId=" + threadId);
      const scraperApiUrl = getScraperBaseUrl().concat(encodeURI('/article?url=' + url + '&language=' + language + "&translate=" + translate))
      if (url !== null && threadId === 0) {
        let response1 = await axios.get(scraperApiUrl);
        if (!isEmpty(response1) && !isEmpty(response1.data)) {
          // console.log("Article1: data=" + JSON.stringify(response1.data, null, 2));
          setThreadId(response1.data.thread_id);
          notify(props.onProgress, {article: article, threadId: response1.data.thread_id});
        }
      }
      if (threadId !== 0 && article.progress < 100) {
        await sleep(10);
        const scraperApiUrl = getScraperBaseUrl().concat('/article/' + threadId);
        let response2 = await axios.get(scraperApiUrl)
        if (!isEmpty(response2) && !isEmpty(response2.data) && !isEquivalent(article, response2.data)) {
          // console.log("Article2: data=" + JSON.stringify(response2.data, null, 2));
          setArticle(response2.data);
          notify(props.onProgress, {article: response2.data, threadId: threadId});
        }
      }
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }); // Empty array ensures that effect is only run on mount and unmount

  let progressText = '';
  switch (article.progress) {
    case 20:
      progressText = 'Downloading';
      break;
    case 40:
      progressText = 'Parsing';
      break;
    case 60:
      progressText = 'Natural Language Processing';
      break;
    case 100:
      progressText = 'Done';
      break;
    default:
      break;
  }
  return (
    <div className="progress-container">
      <span className="progress-badge">Progress</span>
      <Progress max="100" value={article.progress}>
        <span className="progress-value">{progressText} {article.progress}%</span>
      </Progress>
    </div>
  );
}
