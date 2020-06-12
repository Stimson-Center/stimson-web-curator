import axios from 'axios';

import {flaskBackendUrl} from "../../variables/google";

it('GoogleCustomSearch', async () => {
  const payload = {
    "allOfTheseWords": 'tricolor rat terrier',
    "exactTerms": '"rat terrier"',
    "orTerms": 'miniature standard',
    "excludeTerms": 'rodent "Jack Russell"',
    "siteSearch": null,
    "lowRange": "any",
    "highRange": "any",
    "language": "English",
    "country": "United Kingdom",
    "fileType": null,
    "sort": "date",
    "start": 1
  };
  const url = flaskBackendUrl.concat('/search');
  expect(url).toEqual("http://localhost:5000/search");
  const response = await axios.post(url, payload);
  console.log(JSON.stringify(response.data, null, 2));
  expect(response.status).toEqual(200)
  expect(response.statusText).toEqual("OK")
  expect(response.data.length > 10);
});
