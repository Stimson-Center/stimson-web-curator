
import React, {useEffect, useState} from 'react';
// reactstrap components
import {Progress} from "reactstrap";
import axios from "axios";
import {domain} from 'variables/general';
import {isEmpty} from 'Utils';


// https://reactnavigation.org/docs/en/params.html
// export const Article = (urlObj, threadIdObj) => {
export function Article({...props}) {
  const [article, setArticle] = useState({progress: 0});
  const [threadId, setThreadId] = useState(props.threadId);
  // console.log("In Article props=" + JSON.stringify(props, null, 2));

  const url = props.url;
  useEffect(() => {
    const fetchData = async () => {
      if (url !== "" && threadId === 0) {
        console.log("In Article url=" + url + " threadId=" + threadId);
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
          console.log("data=" + JSON.stringify(response1.data, null, 2));
          setThreadId(response1.data.thread_id);
        }
      }
      if (threadId !== 0 && article.progress < 100) {
        console.log("In Article threadId=" + threadId);
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
          console.log("data=" + JSON.stringify(response2.data, null, 2));
          setArticle(response2.data);
        }
      }
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, [url, threadId]); // Empty array ensures that effect is only run on mount and unmount

  return article && threadId && (
    <div className="progress-container">
      <span className="progress-badge">Progress</span>
      <Progress max="100" value={article.progress}>
        <span className="progress-value">{article.progress}%</span>
      </Progress>
    </div>
  );
}
