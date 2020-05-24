/*!

=========================================================
* Now UI Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from 'react';
// reactstrap components
import {Progress} from "reactstrap";
import axios from "axios";
import {domain} from 'variables/general';


// https://flaviocopes.com/javascript-sleep/
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// https://reactnavigation.org/docs/en/params.html
function Step2({...props}) {
  const {
    wizardData,
  } = props;

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

  const [article, setArticle] = useState([{progress: 10}]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isEmpty(wizardData)) {
        console.log("wizardData=" + JSON.stringify(wizardData, null, 2));
        let response1 = await axios({
          method: 'get',
          baseUrl: domain,
          url: '/article?url=' + wizardData.Download.url,
          headers: {
            "Authorization": "",
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .catch(err => {
            console.log(err)
          });
        console.log("data=" + JSON.stringify(response1.data, null, 2));
        let response2 = null;
        do {
          await sleep(2000)
          response2 = await axios({
            method: 'get',
            baseUrl: domain,
            url: '/article/' + response1.data['thread_id'],
            headers: {
              "Authorization": "",
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
            .catch(err => {
              console.log(err)
            });
          if (response2) {
            console.log("data=" + JSON.stringify(response2.data, null, 2));
          }
          setArticle(response2.data);
        } while (response2.data['progress'] < 100);

        setArticle(response2.data);
      }
    }
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, [wizardData.hasOwnProperty("Download")]); // Empty array ensures that effect is only run on mount and unmount


  return (
    <>
      <div className="progress-container">
        <span className="progress-badge">Progress</span>
        <Progress max="100" value={article.progress}>
          <span className="progress-value">{article.progress}%</span>
        </Progress>
      </div>
    </>
  );
}


export default Step2;
