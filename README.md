# Drupal theme tools

<!-- TOC depthFrom:2 depthTo:3 -->

- [Overview](#overview)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Via Git](#via-git)
- [Configuration](#configuration)
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
They were written primarily for use on Drupal sites, but there's no reason that
they can't be used on other platforms.

They use Gulp v4, but the latest version of Gulp CLI will ensure you don't need
to remove your current v3 installation of Gulp.

## Requirements

* NodeJS >= v4
* Gulp CLI (`npm install -g gulp-cli`).

## Installation

### Via Git

1. Clone the repository.
2. Navigate to `theme`.
3. Run `npm install`.

## Configuration

1. Rename `config.example.json` to `config.json`.
2. Change the values to reflect your project.

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
- Pull requests must be reviewed by at least one third party unless there are
  special circumstances.
- Document your changes.

[autoprefixer]: https://github.com/postcss/autoprefixer
[eslint]: http://eslint.org/
[tslint]: https://palantir.github.io/tslint/