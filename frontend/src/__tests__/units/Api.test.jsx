import axios from 'axios';

import {getScraperBaseUrl} from "../../Utils";

it('GoogleCustomSearch', async () => {
  const payload = {
    "allOfTheseWords": 'tricolor rat terrier',
    "exactTerms": '"rat terrier"',
    "orTerms": 'miniature standard',
    "excludeTerms": 'rodent "Jack Russell"',
    "siteSearch": null,
    "siteSearchFilter": "e",
    "lowRange": "any",
    "highRange": "any",
    "language": "English",
    "country": "United Kingdom",
    "fileType": null,
    "sort": "date",
    "start": 1
  };
  const scraperApiUrl = getScraperBaseUrl().concat('/search');
  const response = await axios.post(scraperApiUrl, payload);
  console.log(JSON.stringify(response.data, null, 2));
  expect(response.status).toEqual(200)
  expect(response.statusText).toEqual("OK")
  expect(response.data.length > 10);
});
