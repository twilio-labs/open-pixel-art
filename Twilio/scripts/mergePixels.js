const fs = require('fs');
const { stripIndent } = require('common-tags');
const path = require('path');
const { promisify } = require('util');
const { sortPixels, pixelsToString } = require('../utils/pixels-helper');
const appDefaults = require('../_data/defaults.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const pixelToId = pixel => `${pixel.x}|${pixel.y}|${pixel.username}`;
const coordinatesToId = coord => `${coord.x},${coord.y}`;

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
    const msg = `
More pixels than one have been added or modified. This requires a manual merge.

The following pixels have been added or modified:

${pixelsToString(missingPixels)}

We are overriding the changes with the latest changes and wrote the conflicting pixels into a file in the project called "pixels-conflict.log"
    `.trim();

    const err = new Error(msg);
    Object.defineProperty(err, 'missingPixels', { value: missingPixels });
    throw err;
  }

  return missingPixels[0];
}

function getNextCoordinate(currentX, currentY, width, height) {
  let x = currentX + 1;
  let y = currentY;

  if (x >= width) {
    x = 0;
  }

  if (x === 0) {
    y = currentY + 1;

    if (y >= height) {
      y = 0;
    }
  }

  return { x, y };
}

function getAlternativePixel(takenPixels, invalidPixel, image) {
  const { username, x: preferredX, y: preferredY, color } = invalidPixel;

  const takenCoordinates = new Set(takenPixels.data.map(coordinatesToId));

  let x = preferredX;
  let y = preferredY;

  do {
    const { x: newX, y: newY } = getNextCoordinate(
      x,
      y,
      image.width,
      image.height
    );

    if (newX === preferredX && newY === preferredY) {
      throw new Error(
        'Could not find any free pixel. Please file an issue about increasing the canvas size.'
      );
    } else {
      x = newX;
      y = newY;
    }
  } while (takenCoordinates.has(coordinatesToId({ x, y })));

  return { y, x, color, username };
}

function isPixelTaken(currentPixels, newPixel) {
  return (
    currentPixels.data.find(
      pixel => pixel.x === newPixel.x && pixel.y === newPixel.y
    ) !== undefined
  );
}

async function run(args) {
  const [
    nodePath,
    scriptPath,
    oldFilePath,
    branchFilePath,
    currentFilePath
  ] = args;

  const oldPixels = await getSortedPixelsFromFile(oldFilePath);
  const currentPixels = await getSortedPixelsFromFile(currentFilePath);
  const branchPixels = await getSortedPixelsFromFile(branchFilePath);

  let newPixel;
  try {
    newPixel = findNewPixel(oldPixels, branchPixels);
  } catch (err) {
    if (err.missingPixels) {
      const content = `
The following pixels were removed from the _data/pixels.json file due to a conflict. 
If this was by accident please place them back into the right location and commit again.

${pixelsToString({ data: err.missingPixels })}
      `.trim();
      await writeFile(
        path.resolve(__dirname, '../pixels-conflict.log'),
        content,
        'utf8'
      );
    }
    const outputPixels = sortPixels(currentPixels);
    await writeFile(branchFilePath, pixelsToString(outputPixels), 'utf8');

    throw err;
  }

  const pixelIsTaken = isPixelTaken(currentPixels, newPixel);
  if (newPixel && !pixelIsTaken) {
    currentPixels.data.push(newPixel);
  } else if (newPixel) {
    const alternativePixel = getAlternativePixel(
      currentPixels,
      newPixel,
      appDefaults.image
    );

    console.warn(
      `
Unfortunately your pixel already had been taken. Instead we picked the following pixel for you:

${pixelsToString(alternativePixel)}

If you do not like this pixel, feel free to pick another one instead by modifying the file again and commiting the new changes.
      `.trim()
    );
    currentPixels.data.push(alternativePixel);
  }

  const outputPixels = sortPixels(currentPixels);
  await writeFile(branchFilePath, pixelsToString(outputPixels), 'utf8');
}

if (process.argv.length >= 5 && process.argv[1].includes('mergePixels.js')) {
  run(process.argv)
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}

module.exports = {
  getSortedPixelsFromFile,
  findNewPixel,
  getNextCoordinate,
  getAlternativePixel,
  isPixelTaken,
  run
};
