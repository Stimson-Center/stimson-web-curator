import axios from 'axios';

import {getScraperBaseUrl, str2ab, toUTF8Array} from "../../Utils";

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


it('PDF', async () => {
  const payload = {
    "authors": [
      "Myanmar Times",
      "Bangkok Post Public Company Limited"
    ],
    "config": {
      "language": "en",
      "translate": false
    },
    "html": '<!doctype html>\n<html>\n<head>\n\<\head>"',
    "title": "Myawaddy industrial zone set for 2017 opening",
    "topimage": "https://static.bangkokpost.com/media/content/20150929/c1_711600_700.jpg",
    "url": "https://www.bangkokpost.com/world/711600/myawaddy-industrial-zone-set-for-2017-opening",
    "workflow": [
      "INIT",
      "DOWNLOADED",
      "PARSED",
      "NLPED"
    ],
    "keywords": [
      "zone",
      "myanmar",
      "myawaddy",
      "thailand",
      "electricity",
      "state",
      "factory",
      "naung",
      "mic",
      "industrial",
      "project",
      "kilometres"
    ],
    "images": [
      "https://static.bangkokpost.com/newdesign/assets/images/postgroup-logo_white.svg",
      "https://static.bangkokpost.com/newdesign/assets/images/BangkokPost.svg",
      "https://static.bangkokpost.com/media/content/20150929/c1_711600.jpg",
      "https://static.bangkokpost.com/media/content/20200715/c1_1951928_200715193603.jpg",
      "https://static.bangkokpost.com/media/content/20200715/c1_1951932.jpg",
      "https://static.bangkokpost.com/newdesign/assets/images/BangkokPost-blue.svg",
      "https://static.bangkokpost.com/media/content/20200715/c1_1951936.jpg",
      "https://www.bangkokpost.com/ads/newspaper_direct/enewspaper.jpg?20200716",
      "https://static.bangkokpost.com/media/content/20150929/c1_711600_700.jpg"
    ],
    "language": "en",
    "movies": [],
    "publish_date": "2015-09-29",
    "tables": [],
    "summary": "Myawaddy industrial zone set for 2017 opening",
    "text": "Myawaddy industrial zone set for 2017 opening\n\nThe Mae Sot checkpoint in Tak province is a main trade point ",
  }
  const scraperApiUrl = getScraperBaseUrl().concat('/pdf');
  const response = await axios.post(scraperApiUrl, payload);
  // const response = await axios.post("http://localhost:8080/pdf", payload);
  // const response = await axios.post("http://localhost:5000/pdf", payload);
  // const response = await axios.post("http://localhost:3000/pdf", payload);
  expect(response.status).toEqual(200);
  expect(response.statusText).toEqual("OK");
  const response_data = response.data
  const x = str2ab(response_data);
  // const y = toUTF8Array(response_data);
  expect(response.data.length);
});
