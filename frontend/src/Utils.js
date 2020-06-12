
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

const getSearchYears = () => {
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let year = currentYear; year >= 1995; year--) {
    years.push(year.toString())
  }
  return years;
}

export {
  sleep,
  isEmpty,
  convertTimestampToDateFormat,
  getSearchYears
};
