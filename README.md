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
