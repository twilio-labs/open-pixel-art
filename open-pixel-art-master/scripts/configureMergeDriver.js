const { command: exec } = require('execa');
const ora = require('ora');

let spinner;
async function run() {
  spinner = ora('Configuring custom merge driver').start();
  await exec(
    `git config merge.pixels.name "A custom merge driver for the pixels file"`,
    { shell: true }
  );
  await exec(
    `git config merge.pixels.driver "node scripts/mergePixels.js %O %A %B"`,
    { shell: true }
  );
  spinner.succeed('Configured custom merge driver');
}

run().catch(err => {
  if (spinner) {
    spinner.fail('Failed to configure custom merge driver for pixels.json');
  }
  console.error(err.all);
  process.exit(1);
});
