const stringify = require('json-stringify-pretty-compact');

function pixelSortFunction(a, b) {
  const xDiff = a.x - b.x;
  const yDiff = a.y - b.y;

  if (yDiff > 0) {
    // pixel is further down a row
    return 1;
  }

  if (yDiff < 0) {
    // pixel a closer to the beginning of a row
    return -1;
  }

  // yDiff must be 0 to make it here

  if (xDiff > 0) {
    // pixel a is in a lower row
    return 1;
  }

  if (xDiff < 0) {
    // pixel a is in a higher row
    return -1;
  }

  return 0;
}

function sortPixels(pixelJson) {
  const data = [...pixelJson.data].sort(pixelSortFunction);

  return {
    data
  };
}

function pixelsToString(pixelJson) {
  return stringify(pixelJson, { indent: 2, maxLength: 100 });
}

module.exports = {
  sortPixels,
  pixelSortFunction,
  pixelsToString
};
