const { stripIndent } = require('common-tags');
const {
  sortPixels,
  pixelSortFunction,
  pixelsToString
} = require('../../utils/pixels-helper');

describe('sortPixels', () => {
  test('sorts pixels in y ascending order', () => {
    const old = {
      data: [
        { y: 1, x: 2, color: '#000000', username: 'dkundel' },
        { y: 2, x: 2, color: '#000001', username: 'twilio' },
        { y: 1, x: 3, color: '#000002', username: 'twilio-labs' },
        { y: 0, x: 1, color: '#000002', username: 'panda' }
      ]
    };

    const sorted = sortPixels(old);
    expect(sorted).toEqual({
      data: [
        { y: 0, x: 1, color: '#000002', username: 'panda' },
        { y: 1, x: 2, color: '#000000', username: 'dkundel' },
        { y: 1, x: 3, color: '#000002', username: 'twilio-labs' },
        { y: 2, x: 2, color: '#000001', username: 'twilio' }
      ]
    });
    expect(old).toEqual({
      data: [
        { y: 1, x: 2, color: '#000000', username: 'dkundel' },
        { y: 2, x: 2, color: '#000001', username: 'twilio' },
        { y: 1, x: 3, color: '#000002', username: 'twilio-labs' },
        { y: 0, x: 1, color: '#000002', username: 'panda' }
      ]
    });
  });

  test('sorts pixels in x ascending order for equal y', () => {
    const old = {
      data: [
        { y: 1, x: 4, color: '#000000', username: 'dkundel' },
        { y: 1, x: 1, color: '#000001', username: 'twilio' },
        { y: 1, x: 2, color: '#000002', username: 'twilio-labs' },
        { y: 1, x: 3, color: '#000002', username: 'panda' }
      ]
    };

    const sorted = sortPixels(old);
    expect(sorted).toEqual({
      data: [
        { y: 1, x: 1, color: '#000001', username: 'twilio' },
        { y: 1, x: 2, color: '#000002', username: 'twilio-labs' },
        { y: 1, x: 3, color: '#000002', username: 'panda' },
        { y: 1, x: 4, color: '#000000', username: 'dkundel' }
      ]
    });
    expect(old).toEqual({
      data: [
        { y: 1, x: 4, color: '#000000', username: 'dkundel' },
        { y: 1, x: 1, color: '#000001', username: 'twilio' },
        { y: 1, x: 2, color: '#000002', username: 'twilio-labs' },
        { y: 1, x: 3, color: '#000002', username: 'panda' }
      ]
    });
  });
});

describe('pixelSortFunction', () => {
  test('sorts by x if y is the same', () => {
    const a = { y: 0, x: 0 };
    const b = { y: 0, x: 1 };

    expect(pixelSortFunction(a, b)).toEqual(-1);
    expect(pixelSortFunction(b, a)).toEqual(1);
  });

  test('sorts by y first', () => {
    const a = { y: 1, x: 0 };
    const b = { y: 0, x: 1 };

    expect(pixelSortFunction(a, b)).toEqual(1);
    expect(pixelSortFunction(b, a)).toEqual(-1);
  });

  test('returns zero for equal coordinates', () => {
    const a = { y: 1, x: 1 };
    const b = { y: 1, x: 1 };

    expect(pixelSortFunction(a, b)).toEqual(0);
    expect(pixelSortFunction(b, a)).toEqual(0);
  });
});

describe('pixelsToString', () => {
  test('formats the pixels correctly', () => {
    const pixels = {
      data: [
        { y: 1, x: 1, color: '#000001', username: 'twilio' },
        { y: 1, x: 2, color: '#000002', username: 'twilio-labs' },
        { y: 1, x: 3, color: '#000002', username: 'panda' },
        { y: 1, x: 4, color: '#000000', username: 'dkundel' }
      ]
    };

    const pixelString = pixelsToString(pixels);
    expect(pixelString).toEqual(stripIndent`
      {
        "data": [
          {"y": 1, "x": 1, "color": "#000001", "username": "twilio"},
          {"y": 1, "x": 2, "color": "#000002", "username": "twilio-labs"},
          {"y": 1, "x": 3, "color": "#000002", "username": "panda"},
          {"y": 1, "x": 4, "color": "#000000", "username": "dkundel"}
        ]
      }
    `);
  });
});
