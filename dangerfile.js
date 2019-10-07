const { message, fail, markdown, danger } = require('danger');
const { stripIndent } = require('common-tags');
const dotProp = require('dot-prop');

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

async function evaluatePixelChanges(jsonPatch) {
  const gitHubUsername = danger.github.pr.user.login;
  if (jsonPatch.diff.length === 1) {
    // Only one pixel has been modified

    const linePatch = jsonPatch.diff[0];
    if (linePatch.op === 'add') {
      // a new pixel has been added

      if (isValidNewPixelSubmission(linePatch.value, gitHubUsername)) {
        return true;
      }
    } else if (linePatch.op === 'remove') {
      // a pixel has been removed

      fail(
        `I'm sorry but you can't remove a pixel that someone else contributed`
      );
      return false;
    } else if (linePatch.op === 'replace' || linePatch.op === 'test') {
      return isValidPixelUpdate(jsonPatch, linePatch, gitHubUsername);
    } else {
      fail(
        `I'm sorry but you can only contribute one pixel per GitHub username.`
      );
    }
  } else {
    if (!allPatchesAreForTheSamePixel(jsonPatch)) {
      return false;
    } else {
      if (jsonPatch.diff.length === 0) {
        fail('This PR appears to be empty and needs a manual review');
        return false;
      }
      return isValidPixelUpdate(jsonPatch, jsonPatch.diff[0], gitHubUsername);
    }
  }
  return false;
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

function isValidPixelUpdate(jsonPatch, specificDiff, gitHubUsername) {
  const lastSlash = specificDiff.path.lastIndexOf('/');
  const normalizedPath = specificDiff.path
    .substr(1, lastSlash - 1)
    .replace(/\//g, '.');
  const propertyName = specificDiff.path.substr(lastSlash + 1);
  const newEntry = dotProp.get(jsonPatch.after, normalizedPath);
  const entryUsernameLowerCase = newEntry.username.toLowerCase();
  const gitHubUsernameLoweCase = gitHubUsername.toLowerCase();

  if (propertyName === 'username') {
    const oldEntry = dotProp.get(jsonPatch.before, normalizedPath);
    if (oldEntry.username !== '<UNCLAIMED>') {
      fail(`I'm sorry but you cannot override someone elses pixel.`);
      return false;
    } else if (entryUsernameLowerCase !== gitHubUsernameLoweCase) {
      fail(
        `The username in your pixel submission needs to match your username of "${gitHubUsername}". You submitted "${newEntry.username}" instead.`
      );
      return false;
    }
  }

  return isValidNewPixelSubmission(newEntry, gitHubUsername);
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

  if (typeof pixel.x !== 'number' || pixel.x < 0) {
    fail(
      'Please make sure your pixel submission has a valid positive `x` coordinate as a number.'
    );
    result = false;
  }

  if (typeof pixel.y !== 'number' || pixel.y < 0) {
    fail(
      'Please make sure your pixel submission has a valid positive `y` coordinate as a number.'
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
  isValidNewPixelSubmission,
  isValidPixelUpdate
};
