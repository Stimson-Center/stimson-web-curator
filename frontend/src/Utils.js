import { config} from 'dotenv';

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

// http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
const isEquivalent = (a, b) => {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

// https://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array/18729931
const toUTF8Array = (str) => {
  var utf8 = [];
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6),
        0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f));
    }
    // surrogate pair
    else {
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode = 0x10000 + (((charcode & 0x3ff) << 10)
        | (str.charCodeAt(i) & 0x3ff));
      utf8.push(0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f));
    }
  }
  return utf8;
}

// https://gist.github.com/getify/3667624
// NOTE: only escapes a " if it's not already escaped
const escapeDoubleQuotes = (str) => {
  return str.replace(/\\([\s\S])|(")/g, "\\$1$2"); // thanks @slevithan!
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

const getValueByIndex = (object, idx) => {
  const key = Object.keys(object)[idx];
  return object[key]
}

const getScraperBaseUrl = () => {
  config()
  const isDevEnvironment = process.env.SCRAPPER_URL === "production" ? "production" : "development"
  const GCLOUD = "https://stimson-web-curator-api.uk.r.appspot.com";
  const LOCAL = "http://localhost:5000";
  return isDevEnvironment ? LOCAL : GCLOUD;
}

export {
  sleep,
  isEmpty,
  convertTimestampToDateFormat,
  getSearchYears,
  isEquivalent,
  toUTF8Array,
  escapeDoubleQuotes,
  getKeyByValue,
  getValueByIndex,
  getScraperBaseUrl
};
