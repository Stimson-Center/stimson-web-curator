import {config} from "dotenv";

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
  const GCLOUD = "https://stimson-web-curator-api.uk.r.appspot.com";
  // const LOCAL = "http://localhost:5000";
  // const env = config().parsed;
  // if (env && env.hasOwnProperty('SCRAPPER_URL')) {
  //   return env.SCRAPPER_URL === "production" ? GCLOUD : LOCAL;
  // }
  return GCLOUD;
}

// ##############################
// // // Function that converts a hex color number to a RGB color number
// #############################
function hexToRGB(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

// https://stackoverflow.com/questions/9849754/how-can-i-replace-newlines-line-breaks-with-spaces-in-javascript/34936253#:~:text=replace()%20function%3A,than%20just%20the%20first%20one.
const replaceNewlineWithSpace = (str) => {
  /*
    The /[\r\n\x0B\x0C\u0085\u2028\u2029]+/g means:

      [ - start of a positive character class matching any single char defined inside it:
      \r - (\x0D) - \n] - a carriage return (CR)
      \n - (\x0A) - a line feed character (LF)
      \x0B - a line tabulation (LT)
      \x0C - form feed (FF)
      \u0085 - next line (NEL)
      \u2028 - line separator (LS)
      \u2029 - paragraph separator (PS) ] - end of the character class
      + - a quantifier that makes the regex engine match the previous atom (the character class here) one or more times (consecutive linebreaks are matched)
      /g - find and replace all occurrences in the provided string.
   */
  if (str && str.length) {
    // eslint-disable-next-line no-control-regex
    return str.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ' ');
  }
  return str;
}


const ab2str = (buf) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}


// core components
// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
const str2ab = (str) => {
  let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  let bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// https://gist.github.com/joni/3760795/8f0c1a608b7f0c8b3978db68105c5b1d741d0446
const toUTF8Array = (str) => {
  let utf8 = [];
  for (let i=0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6),
        0x80 | (charcode & 0x3f));
    }
    else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12),
        0x80 | ((charcode>>6) & 0x3f),
        0x80 | (charcode & 0x3f));
    }
    // surrogate pair
    else {
      i++;
      charcode = (((charcode&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff)) + 0x010000;
      utf8.push(0xf0 | (charcode >>18),
        0x80 | ((charcode>>12) & 0x3f),
        0x80 | ((charcode>>6) & 0x3f),
        0x80 | (charcode & 0x3f));
    }
  }
  return utf8;
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
  getScraperBaseUrl,
  hexToRGB,
  replaceNewlineWithSpace,
  ab2str,
  str2ab
};
