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

// https://flaviocopes.com/javascript-sleep/
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// https://reactnavigation.org/docs/en/params.html
function Step2({...props}) {
  const {
    navigation,
  } = props;

  const [article, setArticle] = useState([]);

  const domain = "http://localhost:5000";
  useEffect(() => {
    const fetchData = async () => {
      // https://aws-amplify.github.io/docs/js/authentication
      // let request = axios.create({
      //   baseURL: domain + '/article'
      // });
      // let response = await request.post('url=https://www.yahoo.com')
      //   .catch(err => {
      //     console.log(err)
      //   });
      let response1 = await axios({
        method: 'get',
        baseUrl: domain,
        url: '/article?url=https://www.yahoo.com',
        form: {
          url: 'https://www.yahoo.com'
        },
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
      } while(response2.data['progress'] < 100);

      setArticle(response2.data);
    };
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, []);


  return (
    <>
      <div className="progress-container">
        <span className="progress-badge">Progress</span>
        <Progress max="100" value="25">
          <span className="progress-value">{article.progress}%</span>
        </Progress>
      </div>
    </>
  );
}


export default Step2;
