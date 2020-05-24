// https://flaviocopes.com/javascript-sleep/
export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}
