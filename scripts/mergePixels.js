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

  if (missingPixels.length > 1) {
    throw new Error(
      'More pixels than one have been added. This requires a manual merge.'
    );
  }

  return missingPixels[0];
}

function isPixelTaken(currentPixels, newPixel) {
  return (
    currentPixels.data.find(
      pixel => pixel.x === newPixel.x && pixel.y === newPixel.y
    ) !== undefined
  );
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

  const newPixel = findNewPixel(oldPixels, branchPixels);
  const pixelIsTaken = isPixelTaken(currentPixels, newPixel);
  if (newPixel && !pixelIsTaken) {
    currentPixels.data.push(newPixel);
  } else if (newPixel) {
    // TODO: This should instead move the pixel to another suitable location
    throw new Error(
      'Could not merge automatically because the pixel you provided has already been claimed.'
    );
  }

  const outputPixels = sortPixels(currentPixels);
  await writeFile(branchFilePath, pixelsToString(outputPixels), 'utf8');
}

run()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
