# Parshape

See [parshape.com](https://parshape.com) for a live version.

## Static Build

[![Static Build](https://github.com/tmscer/parshape/actions/workflows/static-build.yml/badge.svg?branch=master)](https://github.com/tmscer/parshape/actions/workflows/static-build.yml)

To obtain a static build click the badge above and
go to the latest build. On successful static builds, there is a section called **Artifacts**
with a ZIP file.

To serve the contents of the ZIP file, unpack it and serve using any HTTP server.
My favourite way to do so is using

```console
$ npx http-server -p 9000 &  # ensure you are in the correct directory
$ firefox localhost:9000
```

To create a build locally, run

```console
$ npm run build:static
```

after setting up your development environment using instructions below.

## Local development

Required programs:

- [Node.js](https://nodejs.org/en/download/) version >= 14 and compatible NPM

To get started, run the following commands:

```console
$ npm install  # install dependencies
$ npm run dev  # run local development server
```

A local build can be made with

```console
$ npm run build
```

and served with

```console
$ npm run start
```

## Documentation

This project is documented in two ways: code with its tests and a PDF file.

### Code and tests

Ideally all code should be tested -- don't understand what a line
of code does? Try to change it or remove it and see what functionality breaks
and which tests don't pass. Still have no clue? File an [issue](https://github.com/tmscer/parshape/issues/new).

React components should be understandable to a React developer. For everything
else there should be readable code (explanatory variables, short functions) and tests.

Jest is the chosen test runner. To run all tests, use:

```console
$ npm run test  # or `npm run test:watch` when developing
```

### PDF

[![Build Docs](https://github.com/tmscer/parshape/actions/workflows/docs.yml/badge.svg)](https://github.com/tmscer/parshape/actions/workflows/docs.yml)

To obtain the PDF doc file, click the badge above and select the lastest successful run from branch `master`.
The PDF contains high-level introduction to the project and explanation of some used
algorithms and math formulas.
