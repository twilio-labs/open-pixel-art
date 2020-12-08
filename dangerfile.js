const { message, fail, markdown, danger } = require('danger');
const { stripIndent, stripIndents } = require('common-tags');

function handleMultipleFileChanges(gitChanges) {
  fail(
    'This PR requires a manual review because you are changing more files than just `_data/pixels.json`.'
  );
  markdown(stripIndent`
    ## FAQ

    *Why has my Pull Request failed the tests?*

    Your Pull Request didn't fail the tests but you modified more files with
    this PR than just the \`_data/pixels.json\` file.

    The files you modified are:
    ${gitChanges.modified_files.map(name => `- ${name}`).join('\n')}
    ${gitChanges.created_files.map(name => `- ${name}`).join('\n')}
    ${gitChanges.deleted_files.map(name => `- ${name}`).join('\n')}

    If you did this on purpose, please consider breaking your PR into multiple ones.
    This will help us to auto-verify your pixels change and someone will take a
    look at the remaining PR.

    If you *didn't* do this on purpose, check out https://dangitgit.com/ or
    other resources on how you can revert the remaining changes.
  `);
}

function handleSuccessfulSubmission() {
  message('Thank you so much for contributing your pixel! 💖');
}

function doesJsonMatchSchema(json) {
  const expectedKeys = ['data'];
  const actualKeys = Object.keys(json);

  const doesJsonHaveExpectedNumberOfKeys =
    expectedKeys.length === actualKeys.length;

  const doesJsonContainExpectedKeys = expectedKeys.every(expectedKey =>
    actualKeys.includes(expectedKey)
  );

  return doesJsonHaveExpectedNumberOfKeys && doesJsonContainExpectedKeys;
}

function convertJsonToPixelSet({ data }) {
  const pixelSet = new Set();
  data.forEach(pixel => pixelSet.add(JSON.stringify(pixel)));

  return pixelSet;
}

async function evaluatePixelChanges(jsonPatch) {
  if (!doesJsonMatchSchema(jsonPatch.after)) {
    fail(stripIndents`Your pixels.json file does not match the expected schema.

    expected schema: 
    {
      data: [
        // pixels go here
      ]
    }
    `);
    return false;
  }

  const isDiffEmpty = jsonPatch.diff.length === 0;
  if (isDiffEmpty) {
    fail('This PR appears to be empty and needs a manual review.');
    return false;
  }

  const beforePixels = convertJsonToPixelSet(jsonPatch.before);
  const afterPixels = convertJsonToPixelSet(jsonPatch.after);

  const areMultipleNewPixels = afterPixels.size - beforePixels.size > 1;
  if (areMultipleNewPixels) {
    fail(`You can not add more than one pixel.`);
    return false;
  }

  const pixelsNotInAfter = [...beforePixels].filter(
    pixel => !afterPixels.has(pixel)
  );

  const arePixelsMissingFromAfter = pixelsNotInAfter.length > 0;
  if (arePixelsMissingFromAfter) {
    const removedUserNames = pixelsNotInAfter.map(
      pixelString => JSON.parse(pixelString).username
    );

    fail(
      'It seems like you are accidentally deleting or editing some contributions of others. Please make sure you have pulled the latest changes from the master branch and resolved any merge conflicts. https://help.github.com/en/articles/syncing-a-fork'
    );
    fail(
      stripIndents`Make sure that the following usernames are indeed included and unchanged: ${removedUserNames.join(
        ','
      )}`
    );
    return false;
  }

  const gitHubUsername = danger.github.pr.user.login;

  const pixelsWithGitHubUsername = jsonPatch.after.data.filter(
    pixel => pixel.username.toLowerCase() === gitHubUsername.toLowerCase()
  );

  if (pixelsWithGitHubUsername.length > 1) {
    fail(stripIndents`
    You cannot create more than one pixel per GitHub username.

    These are the pixels at the following locations for the GitHub username "${gitHubUsername}" in the pixels.json file:
    ${pixelsWithGitHubUsername
      .map(pixel => `{ x: ${pixel.x}, y: ${pixel.y} }`)
      .join('\n')}
    `);
    return false;
  }

  const newPixel = jsonPatch.after.data.find(
    pixel => !beforePixels.has(JSON.stringify(pixel))
  );

  return isValidNewPixelSubmission(newPixel, gitHubUsername);
}

function getIndexFromPath(diffPath) {
  return parseInt(diffPath.replace('/data/', '').match(/^\d*/)[0], 10);
}

function hasOperation(diffs, operation) {
  for (const diff of diffs) {
    if (diff.op === operation) {
      return true;
    }
  }

  return false;
}

function allPatchesAreForTheSamePixel(jsonPatch) {
  const diffs = jsonPatch.diff;
  const addOperations = diffs.filter(x => x.op === 'add');

  if (addOperations.length > 1) {
    fail(
      'It seems like you are adding more than one pixel. This will require a manual review to make sure this is not a mistake.'
    );
    return false;
  }

  if (hasOperation(diffs, 'remove') || hasOperation(diffs, 'replace')) {
    const allRemovedUsernames = diffs
      .filter(x => x.op === 'remove' || x.op === 'replace')
      .map(x => getIndexFromPath(x.path))
      .map(idx => jsonPatch.before.data[idx])
      .map(pixel => pixel.username)
      .filter(username => username !== '<UNCLAIMED>');

    if (allRemovedUsernames.length > 0) {
      const uniqueRemovedUsernames = [...new Set(allRemovedUsernames)];
      fail(
        'It seems like you are accidentally deleting some contributions of others. Please make sure you have pulled the latest changes from the master branch and resolved any merge conflicts. https://help.github.com/en/articles/syncing-a-fork'
      );
      fail(
        `Make sure that the following usernames are indeed included: ${uniqueRemovedUsernames.join(
          ','
        )}`
      );
      return false;
    }
  }

  let currentPixelIndex = undefined;
  for (let diff of diffs) {
    const idx = getIndexFromPath(diff.path);
    if (typeof currentPixelIndex === 'undefined') {
      currentPixelIndex = idx;
    }

    if (currentPixelIndex !== idx) {
      fail(
        'Please make sure all of your changes are on the same line and that you are only modifying one row.'
      );
      return false;
    }
  }
  return true;
}

function isValidNewPixelSubmission(pixel, gitHubUsername) {
  let result = true;
  const pixelUsernameLowerCase = pixel.username.toLowerCase();
  const gitHubUsernameLoweCase = gitHubUsername.toLowerCase();

  if (pixelUsernameLowerCase !== gitHubUsernameLoweCase) {
    fail(
      `The username in your pixel submission needs to match your username of "${gitHubUsername}". You submitted "${pixel.username}" instead.`
    );
    result = false;
  }

  if (!pixel.color) {
    fail(
      `Please specify either a color using \`color: '#000000\` in your pixel.`
    );
    result = false;
  }

  if (
    typeof pixel.x !== 'number' ||
    pixel.x < 0 ||
    !Number.isInteger(pixel.x)
  ) {
    fail(
      'Please make sure your pixel submission has a valid positive `x` coordinate as an integer.'
    );
    result = false;
  }

  if (
    typeof pixel.y !== 'number' ||
    pixel.y < 0 ||
    !Number.isInteger(pixel.y)
  ) {
    fail(
      'Please make sure your pixel submission has a valid positive `y` coordinate as an integer.'
    );
    result = false;
  }

  return result;
}

function hasOnlyPixelChanges(gitChanges) {
  return (
    gitChanges.modified_files.length === 1 &&
    gitChanges.modified_files[0] === '_data/pixels.json' &&
    gitChanges.created_files.length === 0 &&
    gitChanges.deleted_files.length === 0
  );
}

async function run() {
  if (danger.github.thisPR) {
    if ((await danger.git.linesOfCode()) === 0) {
      fail('This PR is empty and needs a manual review');
    } else if (!hasOnlyPixelChanges(danger.git)) {
      await handleMultipleFileChanges(danger.git);
    } else {
      const jsonPatch = await danger.git.JSONPatchForFile('_data/pixels.json');
      const passed = await evaluatePixelChanges(jsonPatch);
      if (passed) {
        await handleSuccessfulSubmission();
      }
    }
  }
}

run().catch(console.error);

module.exports = {
  allPatchesAreForTheSamePixel,
  evaluatePixelChanges,
  getIndexFromPath,
  handleMultipleFileChanges,
  handleSuccessfulSubmission,
  hasOnlyPixelChanges,
  isValidNewPixelSubmission
};
