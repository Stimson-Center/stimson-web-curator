import axios from 'axios';

import {googleCustomSearchUrl} from "../../Utils";

it('GoogleCustomSearch without crashing', async () => {
  const url = googleCustomSearchUrl("Illegal Unregulated Unrestricted Fishing", 1);
  console.log(JSON.stringify(url, null, 2));
  expect(url).toEqual("http://localhost:5000/search?searchString=Illegal%20Unregulated%20Unrestricted%20Fishing&searchStart=1");
  const response = await axios.get(url);
  console.log(JSON.stringify(response.data, null, 2));
  expect(response.status).toEqual(200)
  expect(response.statusText).toEqual("OK")
  expect(response.data.page_size).toEqual(10);
  expect(response.data.results.length).toEqual(10);
});
