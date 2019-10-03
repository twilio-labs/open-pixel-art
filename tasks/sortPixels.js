const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stringify = require('json-stringify-pretty-compact');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const pixelFilePath = path.join('_data', 'pixels.json');

console.log(pixelFilePath);

readFile(pixelFilePath, { encoding: 'utf8' })
  .then(pixelFileData => {
    const pixels = JSON.parse(pixelFileData);

    pixels.data.sort(sortPixels);
    const sortedPixelString = stringify(pixels, { indent: 2, maxLength: 100 });

    writeFile(pixelFilePath, sortedPixelString);
  })
  .catch(console.log);

function sortPixels(a, b) {
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
}
