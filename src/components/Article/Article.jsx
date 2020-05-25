
import React, {useEffect, useState} from 'react';
// reactstrap components
import {Progress} from "reactstrap";
import axios from "axios";
import {domain} from 'variables/general';
import {isEmpty, sleep} from 'Utils';

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

// https://reactnavigation.org/docs/en/params.html
// export const Article = (urlObj, threadIdObj) => {
export function Article({...props}) {
  const [article, setArticle] = useState({progress: 0});
  const [threadId, setThreadId] = useState(props.threadId);

  const url = props.url;
  useEffect(() => {
    const fetchData = async () => {
      // console.log("In Article fetchData url=" + url + " threadId=" + threadId);
      if (url !== null && threadId === 0) {
        let response1 = await axios({
          method: 'get',
          baseUrl: domain,
          url: '/article?url=' + url,
          headers: {
            "Authorization": "",
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .catch(err => {
            console.log(err)
          });
        if (!isEmpty(response1) && !isEmpty(response1.data)) {
          // console.log("Article1: data=" + JSON.stringify(response1.data, null, 2));
          setThreadId(response1.data.thread_id);
          notify(props.onChange, {article: article, threadId: response1.data.thread_id});
        }
      }
      if (threadId !== 0 && article.progress < 100) {
        sleep(2000);
        let response2 = await axios({
          method: 'get',
          baseUrl: domain,
          url: '/article/' + threadId,
          headers: {
            "Authorization": "",
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .catch(err => {
          console.log(err)
        });
        if (!isEmpty(response2) && !isEmpty(response2.data)) {
          // console.log("Article2: data=" + JSON.stringify(response2.data, null, 2));
          setArticle(response2.data);
          notify(props.onChange, {article: response2.data, threadId: threadId});
        }
      }
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }); // Empty array ensures that effect is only run on mount and unmount


  return (
    <div className="progress-container">
      <span className="progress-badge">Progress</span>
      <Progress max="100" value={article.progress}>
        <span className="progress-value">{article.progress}%</span>
      </Progress>
    </div>
  );
}
