const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { sortPixels, pixelsToString } = require('../utils/pixels-helper');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const pixelToId = pixel => `${pixel.x}|${pixel.y}|${pixel.username}`;

async function getSortedPixelsFromFile(filePath) {
  const fileContent = await readFile(filePath, 'utf8');
  const unsortedPixelsJson = JSON.parse(fileContent);
  return sortPixels(unsortedPixelsJson);
}

function findNewPixel(oldPixels, branchPixels) {
  const existingPixels = new Set(oldPixels.data.map(pixelToId));

  const missingPixels = branchPixels.data.filter(
    pixel => !existingPixels.has(pixelToId(pixel))
  );

  if (missingPixels.length > 0) {
    throw new Error(
      'More pixels than one have been added. This requires a manual merge.'
    );
  }

  return missingPixels[0];
}

async function run() {
  const [
    nodePath,
    scriptPath,
    oldFilePath,
    branchFilePath,
    currentFilePath
  ] = process.argv;

  const oldPixels = await getSortedPixelsFromFile(oldFilePath);
  const currentPixels = await getSortedPixelsFromFile(currentFilePath);
  const branchPixels = await getSortedPixelsFromFile(branchFilePath);

  console.log(
    'oldPixels: %O',
    oldPixels.data.find(x => x.username === 'panda')
  );
  console.log(
    'currentPixels: %O',
    currentPixels.data.find(x => x.username === 'panda')
  );
  console.log(
    'branchPixels: %O',
    branchPixels.data.find(x => x.username === 'panda')
  );
  process.exit(1);
  return;

  const newPixel = findNewPixel(oldPixels, branchPixels);
  if (newPixel) {
    currentPixels.data.push(newPixel);
  }

  const outputPixels = sortPixels(currentPixels);
  await writeFile(branchFilePath, pixelsToString(outputPixels), 'utf8');
}

run()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
