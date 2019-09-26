# Contributing to Open Pixel Art

There are two ways you can contribute to this project. You can either contribute a single pixel to the canvas or you can contribute to the underlying project. For example by adding tests, updating the HTML template or updating documentation.

For both scenarios the setup is the same, however, the contribution steps differ slightly.

## I've Never Contributed to Open Source

Contributing to open source can be intimidating at first. For that reason we created a
new mission inside [TwilioQuest](https://www.twilio.com/quest) that will guide you
step-by-step through creating a contribution for this project. Once you [downloaded the game](https://www.twilio.com/quest/download) you'll be able to select the mission and
it will walk you through every step from cloning the project to creating your pull request.

Enjoy your quest!

## Requirements

- A GitHub account
- git installed on your computer. [Learn how to install it](https://help.github.com/en/articles/set-up-git)
- [Node.js](https://nodejs.org) and a package manager like [npm](https://npmjs.com)

## Setup Local Project

1. [Create a fork](https://help.github.com/en/articles/fork-a-repo) of this project
2. Clone the project:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/open-pixel-art.git
```

3. Install the dependencies for local development

```bash
cd open-pixel-art
npm install
```

4. Start a local development server

```bash
npm start
```

5. Open your browser at http://localhost:8080. You should see the same content as on https://open-pixel-art.com just with a grid on the canvas that helps you better place your pixel.

## Contributing a Pixel

If you want to contribute a pixel, you have to open the [`_data/pixels.json`](_data/pixels.json) file. It contains every pixel placed on the canvas.

There's two ways you can contribute a pixel.

### Option 1: "Claim" a pixel

Some entries in the `pixels.json` file exist but have a `username` property of `<UNCLAIMED>`. This means that you can change them to be your pixel. You can change the color to whatever you want. Afterwards change the `username` property to your GitHub username that you'll use to open the pull request with.

### Option 2: Create a new pixel

To create a new pixel, add a new row to the `data` array inside the `pixels.json`.
A new pixel has to be an object with the following four properties:

- `x`: The x-coordinate of your pixel. `0` is the left-most column of pixels
- `y`: The y-coordinate of your pixel. `0` is the bottom-most row of pixels
- `color`: The color your pixel should have as a hex code (e.g. #ff0000 for red)
- `username`: The GitHub username you'll use to create the pull request

The change should look like this:

```diff
{
  "data": [
+    { "y": 10, "x": 20, "color": "#FFFF00", "username": "dkundel" },
    { "y": 1, "x": 3, "color": "#F22F46", "username": "<UNCLAIMED>" },
    ...
  ]
}
```

### Verifying your changes

Once you did your change, go over to http://localhost:8080 and you should see your new pixel. If you are not happy with the placement, keep changing the `x` and `y` values and if you are not happy with the `color` you can keep changing the `color` property.

Afterwards make sure that all tests are still passing by running in a different terminal:

```bash
npm test
```

### Branching and Commiting

Once you are happy with the changes, create a [branch](https://help.github.com/en/articles/about-branches) so we can commit the changes.

```bash
git checkout -b add-my-new-pixel
```

Afterwards you'll have to pick your change and commit it by running:

```bash
git add _data/pixels.json
git commit -m "feat(pixels): add my new pixel"
```

This will create a new commit with the message `feat(pixels): add my new pixel`.
The commit message is following the [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Push Your Changes and Creating a Pull Request

Push your changes to GitHub by running:

```bash
git push origin add-my-new-pixel
```

Afterwards head [follow these instructions](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork) to create a pull request from your fork against the `master` branch of github.com/twilio-labs/open-pixel-art.

## Contributing other Changes

It's great that you want to contribute more than a pixel to this project. Before you start working on the code, make sure to check if there is already a [GitHub issue](https://github.com/twilio-labs/open-pixel-art/issues) for those changes. If there isn't, please open one first. If there is already one, make sure to create a comment to let people know that you are working on a fix for this.

After making the code changes, please follow the steps outlined above.

Once you open a pull request, make sure to uncomment the additional info section in the pull request template and add a description as well as reference any issues this is addressing.

## Project Structure

```
pixel-project-dev
├── .all-contributorsrc
├── .eleventy.js
├── .eleventyignore
├── .git
├── .github
├── .gitignore
├── .mergify.yml
├── .prettierrc
├── .vscode
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── __tests__
├── _data
├── assets
├── dangerfile.js
├── index.njk
├── package-lock.json
├── package.json
└── styles
```

### `.eleventy.js` and `.eleventyignore`

The project is powered by [Eleventy](https://11ty.io). These are the configuration files for the project

### `.mergify.yml`

The project uses Mergify to auto-merge certain PRs based on some conditions.

### `__tests__`

This directory contains all [Jest](https://jestjs.io)-powered unit tests

### `_data`

The `_data` directory contains the `pixels.json` file that represents every single pixel on the canvas, a `defaults.json` file that contains any default values like the size of the canvas, and the `env.js` file for any environment related values. All data will be automatically available in the `index.njk` file.

### `assets`

A directoy for any static assets.

### `dangerfile.js`

We use [Danger](https://danger.systems/js) to perform some code review checks. This file contains the logic for that.

### `index.njk`

This is the template file that is used to generate the HTML of the website.

### `styles`

This directory contains any custom CSS written. The styles for [`index.njk`](index.njk) are in [`styles/main.css`](styles/main.css)

## Code of Conduct

We want to make sure that this project is as welcoming to people as possible. By interacting with the project in any shape or form you are agreeing to the project's [Code of Conduct](CODE_OF_CONDUCT.md). If you feel like another individual has violated the code of conduct, please raise a complaint to [open-source@twilio.com](mailto:open-source@twilio.com).

## Licensing

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.
