const { command: exec } = require('execa');
const ora = require('ora');
const os = require('os');

const trim = x => x.trim();

async function getBranch() {
  const { stdout: branches } = await exec('git branch');
  const branch = branches
    .split(os.EOL)
    .map(trim)
    .find(x => x.startsWith('*'));
  if (!branch) {
    throw new Error('Failed to determine current branch');
  }

  return branch.replace('* ', '');
}

async function run() {
  const spinner = ora('Syncing your fork with the original repo').start();

  spinner.text = 'Getting current branch';
  const currentBranch = await getBranch();

  spinner.text = 'Checking if remote "twilio-labs" is configured';
  const { stdout: remotes } = await exec('git remote');
  const twilioLabsRemoteExists = remotes
    .split(os.EOL)
    .map(trim)
    .includes('twilio-labs');

  if (!twilioLabsRemoteExists) {
    spinner.text = 'Configuring "twilio-labs" remote';
    await exec(
      'git remote add twilio-labs https://github.com/twilio-labs/open-pixel-art.git'
    );
  }

  spinner.text = 'Checking out master branch';
  await exec('git checkout master');

  spinner.text = 'Pulling latest changes for master';
  await exec('git pull twilio-labs master');

  spinner.text = 'Pushing changes up to your fork (origin)';
  await exec('git push origin master');

  spinner.text = 'Pushing changes up to your fork (origin)';
  await exec('git push origin master');

  spinner.text = `Checking out "${currentBranch}" branch`;
  await exec(`git checkout ${currentBranch}`);

  spinner.text = `Merging in changes from master to ${currentBranch}`;
  await exec('git merge master -m "chore: merge changes from master"', {
    uid: process.getuid()
  });
}

run().catch(err => {
  console.log(err);
  console.error(err.stderr);
  process.exit(1);
});
