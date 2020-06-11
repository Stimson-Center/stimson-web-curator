import axios from 'axios';

import {flaskBackendUrl} from "../../variables/google";

it('GoogleCustomSearch', async () => {
  const payload = {
    "allOfTheseWords": "IUU",
    "anyOfTheseWords": null,
    "exactWordOrPhrase": null,
    "fileType": null,
    "language": "Thai",
    "noneOfTheseWordsOrPhrases": null,
    "numbersRangingFrom": null,
    "numbersRangingTo": null,
    "country": "Thailand",
    "searchStart": 1,
    "siteOrDomain": null,
    "termsAppearing": null,
    "sortBy": ""
  };
  const url = flaskBackendUrl.concat('/search');
  expect(url).toEqual("http://localhost:5000/search");
  const response = await axios.post(url, payload);
  console.log(JSON.stringify(response.data, null, 2));
  expect(response.status).toEqual(200)
  expect(response.statusText).toEqual("OK")
  expect(response.data.length > 10);
});
