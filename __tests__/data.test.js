const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

async function loadJson(dataJsonFile) {
  const filePath = path.resolve(__dirname, '../_data/', dataJsonFile);
  const pixelJsonString = await readFile(filePath, 'utf8');
  return JSON.parse(pixelJsonString);
}

describe('pixels', () => {
  test('every username should only claim one pixel', async () => {
    const pixels = await loadJson('pixels.json');
    const usernameSet = new Set();
    for (const pixel of pixels.data) {
      if (pixel.username !== '<UNCLAIMED>') {
        expect(usernameSet.has(pixel.username)).toBeFalsy();
      }
      usernameSet.add(pixel.username);
    }
  });

  test('every pixel should be in the limits of the image', async () => {
    const pixels = await loadJson('pixels.json');
    const defaults = await loadJson('defaults.json');

    for (const pixel of pixels.data) {
      expect(pixel.x).toBeLessThan(defaults.image.width);
      expect(pixel.x).toBeGreaterThanOrEqual(0);
      expect(pixel.y).toBeLessThan(defaults.image.height);
      expect(pixel.y).toBeGreaterThanOrEqual(0);
    }
  });

  test('every pixel should have a color or a tileName property', async () => {
    const pixels = await loadJson('pixels.json');

    for (const pixel of pixels.data) {
      const hasTileName = typeof pixel.tileName !== 'undefined';
      const hasColor = typeof pixel.color !== 'undefined';

      expect(hasTileName || hasColor).toBeTruthy();
    }
  });

  test('every pixel should have a hex code color if present', async () => {
    const pixels = await loadJson('pixels.json');

    for (const pixel of pixels.data) {
      const hasColor = typeof pixel.color !== 'undefined';

      if (hasColor) {
        expect(pixel.color).toMatch(/#[0-9a-f]{3,6}/i);
      }
    }
  });

  test("claimed name doesn't have brackets", async () => {
    const pixels = await loadJson('pixels.json');
    for (const pixel of pixels.data) {
      if (pixel.username !== '<UNCLAIMED>')
        expect(pixel.username).not.toMatch(/^\<.*\>$/);
    }
  });

  test('every pixel should have a unique position', async () => {
    const pixels = await loadJson('pixels.json');
    const positionSet = new Set();
    for (const pixel of pixels.data) {
      expect(positionSet.has({ x: pixel.x, y: pixel.y })).toBeFalsy();
      positionSet.add({ x: pixel.x, y: pixel.y });
    }
  });

  test('every pixel should be in order', async () => {
    const pixels = await loadJson('pixels.json');
    var lastPixel;
    for (const pixel of pixels.data) {
      if (lastPixel !== undefined) {
        // Check if the current pixel is further along in either the x
        // or the y axis
        console.log(pixel.y + ' ' + pixel.x);
        expect(pixel.x > lastPixel.x || pixel.y > lastPixel.y).toBeTruthy();
      }

      lastPixel = pixel;
    }
  });
});
