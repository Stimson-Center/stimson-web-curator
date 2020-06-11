
// https://flaviocopes.com/javascript-sleep/
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const isEmpty = (obj) => {
  return obj === null || obj === undefined || Object.keys(obj).length === 0;
}

const convertTimestampToDateFormat = (timestamp) => {
  const utcDate = new Date(timestamp);

  // NOTE: Do NOT USE getUTC* API here since you want the date, month and year to roll forward or backward when
  // local timezone taken into account!
  // console.log(utcDate.toUTCString());
  return "{0}-{1}-{2}".formatUnicorn(
    utcDate.getFullYear(),
    utcDate.getMonth() + 1,
    utcDate.getDate()
  );
};

const googleCustomSearchUrl = (query, searchStart) => {
  const url = `http://localhost:5000/search?searchString=${query.allOfTheseWords}&searchStart=${searchStart}`;
  return encodeURI(url);
}

export {
  sleep,
  isEmpty,
  convertTimestampToDateFormat,
  googleCustomSearchUrl
};
