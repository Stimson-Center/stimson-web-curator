import axios from 'axios';

import {flaskBackendUrl} from "../../variables/google";

it('GoogleCustomSearch', async () => {
  const payload = {
    "allOfTheseWords": 'tricolor rat terrier',
    "exactWordOrPhrase": '"rat terrier"',
    "anyOfTheseWords": 'miniature standard',
    "noneOfTheseWordsOrPhrases": 'rodent "Jack Russell"',
    "siteOrDomain": null,
    "numbersRangingFrom": null,
    "numbersRangingTo": null,
    "language": "English",
    "country": "United Kingdom",
    "fileType": null,
    "sortBy": "date",
    "termsAppearing": null,
    "searchStart": 1
  };
  const url = flaskBackendUrl.concat('/search');
  expect(url).toEqual("http://localhost:5000/search");
  const response = await axios.post(url, payload);
  console.log(JSON.stringify(response.data, null, 2));
  expect(response.status).toEqual(200)
  expect(response.statusText).toEqual("OK")
  expect(response.data.length > 10);
});
