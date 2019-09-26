jest.mock('danger', () => {
  return {
    message: jest.fn(),
    fail: jest.fn(),
    markdown: jest.fn(),
    danger: {
      git: {},
      github: {}
    }
  };
});

const danger = require('danger');

const {
  allPatchesAreForTheSamePixel,
  evaluatePixelChanges,
  getIndexFromPath,
  handleMultipleFileChanges,
  handleSuccessfulSubmission,
  hasOnlyPixelChanges,
  isValidNewPixelSubmission,
  isValidPixelUpdate
} = require('../dangerfile');

describe('allPatchesAreForTheSamePixel', () => {
  test('placeholder', () => {
    expect(true).toBeTruthy();
  });
});

describe('evaluatePixelChanges', () => {
  test('placeholder', () => {
    expect(true).toBeTruthy();
  });
});

describe('getIndexFromPath', () => {
  test('retrieves the number from a full path', () => {
    const output = getIndexFromPath('/data/123/color');
    expect(output).toBe(123);
  });

  test('retrieves the number from a path', () => {
    const output = getIndexFromPath('/data/345');
    expect(output).toBe(345);
  });

  test('returns NaN for missing number', () => {
    const output = getIndexFromPath('/data/something/hello');
    expect(Number.isNaN(output)).toBe(true);
  });
});

describe('handleMultipleFileChanges', () => {
  test('lists the files touched', () => {
    const changes = {
      modified_files: ['_data/pixels.json'],
      created_files: ['invalid.js'],
      deleted_files: ['dangerfile.js']
    };

    handleMultipleFileChanges(changes);
    expect(danger.fail).toHaveBeenCalled();
    expect(danger.markdown.mock.calls[0][0]).toContain('_data/pixels.json');
    expect(danger.markdown.mock.calls[0][0]).toContain('invalid.js');
    expect(danger.markdown.mock.calls[0][0]).toContain('dangerfile.js');
  });
});

describe('handleSuccessfulSubmission', () => {
  test('prints message', () => {
    handleSuccessfulSubmission();
    expect(danger.message).toHaveBeenCalled();
  });
});

describe('hasOnlyPixelChanges', () => {
  test('is true if only pixels.json is modified', () => {
    const changes = {
      modified_files: ['_data/pixels.json'],
      created_files: [],
      deleted_files: []
    };

    expect(hasOnlyPixelChanges(changes)).toBe(true);
  });

  test('is false if more files have been modified', () => {
    const changes = {
      modified_files: ['_data/pixels.json', '_data/env.json'],
      created_files: [],
      deleted_files: []
    };

    expect(hasOnlyPixelChanges(changes)).toBe(false);
  });

  test('is false if a file has been deleted', () => {
    const changes = {
      modified_files: ['_data/pixels.json'],
      created_files: [],
      deleted_files: ['dangerfile.js']
    };

    expect(hasOnlyPixelChanges(changes)).toBe(false);
  });

  test('is false if a file has been created', () => {
    const changes = {
      modified_files: ['_data/pixels.json'],
      created_files: ['_data/invalid.json'],
      deleted_files: []
    };

    expect(hasOnlyPixelChanges(changes)).toBe(false);
  });

  test('is false if no files have been touched', () => {
    const changes = {
      modified_files: [],
      created_files: [],
      deleted_files: []
    };

    expect(hasOnlyPixelChanges(changes)).toBe(false);
  });
});

describe('isValidNewPixelSubmission', () => {
  test('fails if username is wrong', () => {
    const pixel = {
      username: 'twilio',
      color: '#ff0000',
      x: 0,
      y: 0
    };
    expect(isValidNewPixelSubmission(pixel, 'dkundel')).toBe(false);
  });

  test('fails if color is missing', () => {
    const pixel = {
      username: 'twilio',
      x: 0,
      y: 0
    };
    expect(isValidNewPixelSubmission(pixel, 'dkundel')).toBe(false);
  });

  test('fails if x coordinate is not a number', () => {
    const pixel = {
      username: 'twilio',
      color: '#ff0000',
      x: '0',
      y: 0
    };
    expect(isValidNewPixelSubmission(pixel, 'dkundel')).toBe(false);
  });

  test('fails if x coordinate is negative', () => {
    const pixel = {
      username: 'twilio',
      color: '#ff0000',
      x: -10,
      y: 0
    };
    expect(isValidNewPixelSubmission(pixel, 'dkundel')).toBe(false);
  });

  test('fails if x coordinate is negative', () => {
    const pixel = {
      username: 'twilio',
      color: '#ff0000',
      x: -10,
      y: 0
    };
    expect(isValidNewPixelSubmission(pixel, 'dkundel')).toBe(false);
  });

  test('fails if y coordinate is negative', () => {
    const pixel = {
      username: 'twilio',
      color: '#ff0000',
      y: -10,
      x: 0
    };
    expect(isValidNewPixelSubmission(pixel, 'dkundel')).toBe(false);
  });

  test('fails if y coordinate is negative', () => {
    const pixel = {
      username: 'twilio',
      color: '#ff0000',
      y: -10,
      x: 0
    };
    expect(isValidNewPixelSubmission(pixel, 'dkundel')).toBe(false);
  });

  test('succeeds for valid color pixel', () => {
    const pixel = {
      username: 'dkundel',
      color: '#ff0000',
      y: 0,
      x: 0
    };
    expect(isValidNewPixelSubmission(pixel, 'dkundel')).toBe(true);
  });
});

describe('isValidPixelUpdate', () => {
  test('placeholder', () => {
    expect(true).toBeTruthy();
  });
});
