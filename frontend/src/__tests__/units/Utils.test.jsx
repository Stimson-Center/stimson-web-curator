
import {getSearchYears} from "../../Utils";

it('renders without crashing', () => {
  const searchYears = getSearchYears();
  expect(searchYears.includes("2020"));
  expect(searchYears.includes("1995"));
});
