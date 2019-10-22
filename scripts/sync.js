const { command: exec } = require('execa');
const ora = require('ora');
const os = require('os');

const trim = x => x.trim();

const opts = {
  shell: true
};

async function getBranch() {
  const { stdout: branches } = await exec('git branch', opts);
  const branch = branches
    .split(os.EOL)
    .map(trim)
    .find(x => x.startsWith('*'));
  if (!branch) {
    throw new Error('Failed to determine current branch');
  }

  return branch.replace('* ', '');
}

let spinner;

async function run() {
  spinner = ora('Syncing your fork with the original repo').start();

  spinner.text = 'Getting current branch';
  const currentBranch = await getBranch();

  spinner.text = 'Checking if remote "twilio-labs" is configured';
  const { stdout: remotes } = await exec('git remote', opts);
  const twilioLabsRemoteExists = remotes
    .split(os.EOL)
    .map(trim)
    .includes('twilio-labs');

  if (!twilioLabsRemoteExists) {
    spinner.text = 'Configuring "twilio-labs" remote';
    await exec(
      'git remote add twilio-labs https://github.com/twilio-labs/open-pixel-art.git',
      opts
    );
  }

  spinner.text = 'Checking out master branch';
  await exec('git checkout master', opts);

  spinner.text = 'Pulling latest changes for master';
  await exec('git pull twilio-labs master', opts);

  spinner.text = 'Pushing changes up to your fork (origin)';
  await exec('git push origin master', opts);

  spinner.text = 'Pushing changes up to your fork (origin)';
  await exec('git push origin master', opts);

  spinner.text = `Checking out "${currentBranch}" branch`;
  await exec(`git checkout ${currentBranch}`, opts);

  spinner.text = `Merging in changes from master to ${currentBranch}`;
  spinner.stopAndPersist();
  await exec('git merge master -m "chore: merge changes from master"', {
    ...opts,
    stdio: 'inherit'
  });

  spinner.succeed('Project has been successfully updated');
}

run().catch(err => {
  if (spinner) {
    spinner.fail('Failed to sync');
  }
  console.error(err.all);
  process.exit(1);
});
