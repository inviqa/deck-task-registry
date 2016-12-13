# Drupal Deck task registry

[![Build Status](https://travis-ci.org/inviqa/deck-task-registry.svg?branch=master)](https://travis-ci.org/inviqa/deck-task-registry)

<!-- TOC depthFrom:2 depthTo:3 -->

- [Overview](#overview)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Into a new task suite](#into-a-new-task-suite)
  - [Into an existing task suite](#into-an-existing-task-suite)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Build mode](#build-mode)
- [Tasks](#tasks)
  - [Styles](#styles)
  - [Scripts](#scripts)
  - [Images](#images)
  - [Fonts](#fonts)
  - [Build](#build)
- [Contribution](#contribution)

<!-- /TOC -->

## Overview

This toolset is just a collection of Gulp based development and build tasks.
They were written primarily for use on Drupal sites using the Deck subtheme,
but there's no reason that they can't be used on other platforms/themes.

They use Gulp v4, but the latest version of Gulp CLI will ensure you don't need
to remove your current v3 installation of Gulp.

## Requirements

* NodeJS >= v4
* Gulp CLI (`npm install -g gulp-cli`).

## Installation

### Into a new task suite

1. Run `$ npm install deck-task-registry`
2. If the stub files aren't created, then navigate to `node_modules/src/post-install/files` and copy the
   `example.config.js` and `gulpfile.js` files into your Gulp tasks directory, removing any example prefixes.

### Into an existing task suite

1. Run `$ npm install deck-task-registry`
2. If the stub files aren't created, then navigate to `node_modules/src/post-install/files` and copy the
   `example.config.js` file into your Gulp tasks directory, removing any example prefixes.
3. `require` your config and the `drupal-task-registry` module.
4. Add the registry to your project by adding `gulp.registry(config)`

## Usage

### Basic usage

The tools are gulp tasks, so simply run `gulp TASKNAME`.

To see an available list if tasks, run `gulp --tasks`

### Build mode

There are two build modes available to the toolset: development and production.

By default, all Gulp tasks will run in development mode. This means that you
get all sourcemaps and uncompressed build assets this is also true of the main
`build` task.

To enable production mode, simple pass `--production` or `--prod` to the Gulp
task you are running. Further information about what production mode does on a
per-task basis can be found below.

## Tasks

### Styles

#### build:styles

Compiles your SASS and places it into the configured `css` directory.

It also pipes your styles through [AutoPrefixer][autoprefixer], using the
provided browser configuration.

**Development mode**

- Sourcemaps will be generated.

**Production mode**

- Sourcemaps are **not** generated.
- Output CSS is minified.

### Scripts

#### build:scripts

Compiles your JavaScript and/or TypeScript and places it into the configured
`js` directory.

If `optimise` is set to `true`, then your scripts will be piped through the
TypeScript transpiler. This will optimise your code, as well as enable the
following:

- Ability to write ES2015 compliant code
- Ability to write TypeScript compliant code.

Please note, that this does NOT include module loading. **There is no module
loader available with these tools at this time**.

**Development mode**

- Sourcemaps will be generated

**Production mode**

- Sourcemaps will **not** be generated
- Output JS is minified with Uglify. Variables are not truncated as it tends to
  break `Drupal.behaviors`.

#### lint:scripts

Lints your scripts using [ESLint][eslint] and [TSLint][tslint] (if using
TypeScript). Configuration files are loaded by searching parent directories
relative to the scripts being linted, so generally if you want to override them
- simply place a configuration file in your theme directory. In no `.eslintrc`
file is provided; ESLint will use the default configuration that ships with
Drupal (if using Drupal 8). If you're writing ES2015; you'll also want a custom
 `.eslintrc` file.

**Development mode**

- Linting failure will not break return an error code.

**Production mode***

- Linting failure will prevent the build from continuing.

### Images

#### build:images

Compress and optimise all images.

There are no differences between development and production mode for this task.

### Fonts

Copy all fonts found in the `src` directory to the `dest` directory.

There are no differences between development and production mode for this task.

### Build

#### build:clean

Remove any and all assets from the destination directory of each resource type.

There are no differences between development and production mode for this task.

#### build

Run any linting and testing tasks, and then run build tasks providing the test
tasks complete. At the time of writing, the task breakdown is as follows. Note;
all tasks on the same level are run in parallel. Different levels denote series
based tasks.

- `build:clean`
  - `lint:scripts`
    - `build:scripts`
    - `build:styles`
    - `build:images`
    - `build:fonts`

**Development/production mode**

- All development mode settings for each individual task apply as they are run.
  For example, in development mode; sourcemaps are generated, and the output is
  not compressed for scripts and styles.

## Contribution

- Ensure there are tests where possible
- In lieu of a formal styleguide; follow existing formatting, and ensure ESLint
  doesn't fail.
- Document your changes.

[codeship-badge]: https://codeship.com/projects/079634a0-4cf5-0134-4c08-7e829346aa02/status?branch=master
[autoprefixer]: https://github.com/postcss/autoprefixer
[eslint]: http://eslint.org/
[tslint]: https://palantir.github.io/tslint/