const mockFs = require('mock-fs');
const fs = require('fs');
const { promisify } = require('util');
const { stripIndent } = require('common-tags');
const {
  getSortedPixelsFromFile,
  findNewPixel,
  getNextCoordinate,
  getAlternativePixel,
  isPixelTaken,
  run
} = require('../../scripts/mergePixels');

const readFile = promisify(fs.readFile);

jest.setTimeout(10000);

describe('getSortedPixelsFromFile', () => {
  beforeEach(() => {
    mockFs({
      '/sorted/_data/pixels.json': stripIndent`
        {
          "data": [
            {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
            {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
            {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
            {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"}
          ]
        }
      `,
      '/unsorted/_data/pixels.json': stripIndent`
        {
          "data": [
            {"y": 6, "x": 2, "color": "#000000", "username": "alex-owl"},
            {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
            {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
            {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
            {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"}
          ]
        }
      `
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  test('returns already sorted ', async () => {
    const result = await getSortedPixelsFromFile('/sorted/_data/pixels.json');
    expect(result).toEqual({
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 1, x: 1, color: '#000000', username: 'sendgrid' }
      ]
    });
  });

  test('sorts file if necessary ', async () => {
    const result = await getSortedPixelsFromFile('/unsorted/_data/pixels.json');
    expect(result).toEqual({
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 1, x: 1, color: '#000000', username: 'sendgrid' },
        { y: 6, x: 2, color: '#000000', username: 'alex-owl' }
      ]
    });
  });
});

describe('findNewPixel', () => {
  test('returns the right pixel', () => {
    const oldPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 1, x: 1, color: '#000000', username: 'sendgrid' }
      ]
    };

    const branchPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 1, x: 1, color: '#000000', username: 'sendgrid' },
        { y: 6, x: 2, color: '#000000', username: 'alex-owl' }
      ]
    };

    const result = findNewPixel(oldPixels, branchPixels);
    expect(result).toEqual({
      y: 6,
      x: 2,
      color: '#000000',
      username: 'alex-owl'
    });
  });

  test('returns undefined if no pixel is new', () => {
    const oldPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 1, x: 1, color: '#000000', username: 'sendgrid' }
      ]
    };

    const branchPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 1, x: 1, color: '#000000', username: 'sendgrid' }
      ]
    };

    const result = findNewPixel(oldPixels, branchPixels);
    expect(result).toBeUndefined();
  });

  test('returns undefined if branch has less pixels and no new one', () => {
    const oldPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 1, x: 1, color: '#000000', username: 'sendgrid' }
      ]
    };

    const branchPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' }
      ]
    };

    const result = findNewPixel(oldPixels, branchPixels);
    expect(result).toBeUndefined();
  });

  test('throws an error if more than one pixel has been added', () => {
    const oldPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 5, x: 3, color: '#000000', username: 'sendgrid' }
      ]
    };

    const branchPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 2, x: 2, color: '#000000', username: 'panda' },
        { y: 5, x: 3, color: '#000000', username: 'sendgrid' },
        { y: 6, x: 2, color: '#000000', username: 'alex-owl' }
      ]
    };

    const result = () => findNewPixel(oldPixels, branchPixels);
    expect(result).toThrowError();
  });

  test('throws an error if more than one pixel have been touched', () => {
    const oldPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 5, x: 3, color: '#000000', username: 'sendgrid' }
      ]
    };

    const branchPixels = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 3, x: 3, color: '#000000', username: 'sendgrid' },
        { y: 6, x: 2, color: '#000000', username: 'alex-owl' }
      ]
    };

    const result = () => findNewPixel(oldPixels, branchPixels);
    expect(result).toThrowError();
  });
});

describe('getNextCoordinate', () => {
  test('increase x first if possible', () => {
    const { x, y } = getNextCoordinate(0, 0, 5, 5);
    expect(x).toBe(1);
    expect(y).toBe(0);
  });

  test('increase y and wrap x if limit of width is reached', () => {
    const { x, y } = getNextCoordinate(4, 0, 5, 5);
    expect(x).toBe(0);
    expect(y).toBe(1);
  });

  test('wrap both if limit of width and height is reached', () => {
    const { x, y } = getNextCoordinate(4, 4, 5, 5);
    expect(x).toBe(0);
    expect(y).toBe(0);
  });
});

describe('getAlternativePixel', () => {
  test('wraps pixel coordinates successfully', () => {
    const existing = {
      data: [
        { y: 4, x: 2, color: '#000000', username: 'dkundel' },
        { y: 4, x: 3, color: '#000000', username: 'twilio-labs' },
        { y: 4, x: 4, color: '#000000', username: 'twilio' }
      ]
    };
    const newPixel = {
      y: 4,
      x: 3,
      color: '#f0f0f0',
      username: 'panda'
    };
    const result = getAlternativePixel(existing, newPixel, {
      width: 5,
      height: 5
    });
    expect(result).toEqual({
      y: 0,
      x: 0,
      color: '#f0f0f0',
      username: 'panda'
    });
  });

  test('finds the next gap prioritizing x', () => {
    const existing = {
      data: [
        { y: 4, x: 1, color: '#000000', username: 'dkundel' },
        { y: 4, x: 3, color: '#000000', username: 'twilio-labs' },
        { y: 4, x: 4, color: '#000000', username: 'twilio' }
      ]
    };
    const newPixel = {
      y: 4,
      x: 1,
      color: '#f0f0f0',
      username: 'panda'
    };
    const result = getAlternativePixel(existing, newPixel, {
      width: 5,
      height: 5
    });
    expect(result).toEqual({
      y: 4,
      x: 2,
      color: '#f0f0f0',
      username: 'panda'
    });
  });

  test('changes y if necessary', () => {
    const existing = {
      data: [
        { y: 3, x: 2, color: '#000000', username: 'dkundel' },
        { y: 3, x: 3, color: '#000000', username: 'twilio-labs' },
        { y: 3, x: 4, color: '#000000', username: 'twilio' }
      ]
    };
    const newPixel = {
      y: 3,
      x: 2,
      color: '#f0f0f0',
      username: 'panda'
    };
    const result = getAlternativePixel(existing, newPixel, {
      width: 5,
      height: 5
    });
    expect(result).toEqual({
      y: 4,
      x: 0,
      color: '#f0f0f0',
      username: 'panda'
    });
  });

  test('throws if no pixel is available', () => {
    const existing = {
      data: [
        { y: 0, x: 0, color: '#000000', username: 'dkundel' },
        { y: 0, x: 1, color: '#000000', username: 'twilio-labs' },
        { y: 1, x: 0, color: '#000000', username: 'twilio' },
        { y: 1, x: 1, color: '#000000', username: 'sendgrid' }
      ]
    };
    const newPixel = {
      y: 0,
      x: 1,
      color: '#f0f0f0',
      username: 'panda'
    };

    const testFn = () => {
      return getAlternativePixel(existing, newPixel, {
        width: 2,
        height: 2
      });
    };
    expect(testFn).toThrowError();
  });
});

describe('isPixelTaken', () => {
  test('returns true if x and y coordinate are taken', () => {
    const existing = {
      data: [
        { y: 4, x: 2, color: '#000000', username: 'dkundel' },
        { y: 4, x: 3, color: '#000000', username: 'twilio-labs' },
        { y: 4, x: 4, color: '#000000', username: 'twilio' }
      ]
    };
    const newPixel = {
      y: 4,
      x: 3,
      color: '#f0f0f0',
      username: 'panda'
    };
    const result = isPixelTaken(existing, newPixel);
    expect(result).toBeTruthy();
  });

  test('returns false if x coordinate is free', () => {
    const existing = {
      data: [
        { y: 4, x: 2, color: '#000000', username: 'dkundel' },
        { y: 4, x: 4, color: '#000000', username: 'twilio' }
      ]
    };
    const newPixel = {
      y: 4,
      x: 3,
      color: '#f0f0f0',
      username: 'panda'
    };
    const result = isPixelTaken(existing, newPixel);
    expect(result).toBeFalsy();
  });

  test('returns false if x coordinate is free', () => {
    const existing = {
      data: [
        { y: 3, x: 3, color: '#000000', username: 'twilio-labs' },
        { y: 4, x: 2, color: '#000000', username: 'dkundel' },
        { y: 4, x: 4, color: '#000000', username: 'twilio' }
      ]
    };
    const newPixel = {
      y: 4,
      x: 3,
      color: '#f0f0f0',
      username: 'panda'
    };
    const result = isPixelTaken(existing, newPixel);
    expect(result).toBeFalsy();
  });
});

describe('run', () => {
  let consoleWarnBackup = console.warn;
  beforeEach(() => {
    console.warn = () => {};
    mockFs({
      '/same-pixel-conflict/old/_data/pixels.json': stripIndent`
        {
          "data": [
            {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
            {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
            {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
            {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"}
          ]
        }
      `,
      '/same-pixel-conflict/branch/_data/pixels.json': stripIndent`
          {
            "data": [
              {"y": 6, "x": 2, "color": "#000000", "username": "alex-owl"},
              {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
              {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
              {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
              {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"}
            ]
          }
      `,
      '/same-pixel-conflict/current/_data/pixels.json': stripIndent`
          {
            "data": [
              {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
              {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
              {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
              {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"},
              {"y": 6, "x": 2, "color": "#000000", "username": "panda"}
            ]
          }
      `,
      '/different-pixel-conflict/old/_data/pixels.json': stripIndent`
        {
          "data": [
            {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
            {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
            {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
            {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"}
          ]
        }
      `,
      '/different-pixel-conflict/branch/_data/pixels.json': stripIndent`
          {
            "data": [
              {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
              {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
              {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
              {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"},
              {"y": 5, "x": 1, "color": "#000000", "username": "alex-owl"}
            ]
          }
      `,
      '/different-pixel-conflict/current/_data/pixels.json': stripIndent`
          {
            "data": [
              {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
              {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
              {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
              {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"},
              {"y": 6, "x": 2, "color": "#000000", "username": "panda"}
            ]
          }
      `,
      '/reorder-pixel-conflict/old/_data/pixels.json': stripIndent`
        {
          "data": [
            {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
            {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
            {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
            {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"}
          ]
        }
      `,
      '/reorder-pixel-conflict/branch/_data/pixels.json': stripIndent`
          {
            "data": [
              {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
              {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
              {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
              {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"},
              {"y": 5, "x": 1, "color": "#000000", "username": "alex-owl"}
            ]
          }
      `,
      '/reorder-pixel-conflict/current/_data/pixels.json': stripIndent`
          {
            "data": [
              {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
              {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
              {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
              {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"},
              {"y": 6, "x": 2, "color": "#000000", "username": "panda"}
            ]
          }
      `
    });
  });

  afterEach(() => {
    console.warn = consoleWarnBackup;
    mockFs.restore();
  });

  test('handles conflict with same coordinates by shifting branch contribution', async () => {
    const args = [
      '/some/path/to/node',
      '/path/to/scripts/mergePixels.js',
      '/same-pixel-conflict/old/_data/pixels.json',
      '/same-pixel-conflict/branch/_data/pixels.json',
      '/same-pixel-conflict/current/_data/pixels.json'
    ];

    await run(args);
    const content = await readFile(
      '/same-pixel-conflict/branch/_data/pixels.json',
      'utf8'
    );
    expect(content).toBe(stripIndent`
      {
        "data": [
          {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
          {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
          {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
          {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"},
          {"y": 6, "x": 2, "color": "#000000", "username": "panda"},
          {"y": 6, "x": 3, "color": "#000000", "username": "alex-owl"}
        ]
      }
    `);
  });

  test('handles conflict with different pixels by merging', async () => {
    const args = [
      '/some/path/to/node',
      '/path/to/scripts/mergePixels.js',
      '/different-pixel-conflict/old/_data/pixels.json',
      '/different-pixel-conflict/branch/_data/pixels.json',
      '/different-pixel-conflict/current/_data/pixels.json'
    ];

    await run(args);
    const content = await readFile(
      '/different-pixel-conflict/branch/_data/pixels.json',
      'utf8'
    );
    expect(content).toBe(stripIndent`
      {
        "data": [
          {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
          {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
          {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
          {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"},
          {"y": 5, "x": 1, "color": "#000000", "username": "alex-owl"},
          {"y": 6, "x": 2, "color": "#000000", "username": "panda"}
        ]
      }
    `);
  });

  test('handles conflict with reordering changes', async () => {
    const args = [
      '/some/path/to/node',
      '/path/to/scripts/mergePixels.js',
      '/reorder-pixel-conflict/old/_data/pixels.json',
      '/reorder-pixel-conflict/branch/_data/pixels.json',
      '/reorder-pixel-conflict/current/_data/pixels.json'
    ];

    await run(args);
    const content = await readFile(
      '/reorder-pixel-conflict/branch/_data/pixels.json',
      'utf8'
    );
    expect(content).toBe(stripIndent`
      {
        "data": [
          {"y": 0, "x": 0, "color": "#000000", "username": "dkundel"},
          {"y": 0, "x": 1, "color": "#000000", "username": "twilio-labs"},
          {"y": 1, "x": 0, "color": "#000000", "username": "twilio"},
          {"y": 1, "x": 1, "color": "#000000", "username": "sendgrid"},
          {"y": 5, "x": 1, "color": "#000000", "username": "alex-owl"},
          {"y": 6, "x": 2, "color": "#000000", "username": "panda"}
        ]
      }
    `);
  });
});
