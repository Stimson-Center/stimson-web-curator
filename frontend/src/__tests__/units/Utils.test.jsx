
import {getSearchYears, getScraperBaseUrl} from "../../Utils";

it('test getSearchYears', () => {
  const searchYears = getSearchYears();
  expect(searchYears.includes("2020"));
  expect(searchYears.includes("1995"));
});

it('test getScraperBaseUrl', () => {
  const scraperBaseUrl = getScraperBaseUrl();
  expect(scraperBaseUrl.includes("http"));
});
