'use strict';
const fs = require('fs');
const imagemin = require('imagemin');

const plugins = [
  ['imagemin-jpegoptim', { max: 80 }],
  ['imagemin-optipng', { optimizationLevel: 7 }],
  ['imagemin-svgo', { plugins: [{ removeViewBox: false }] }],
].map((it) => require(it[0])(it[1]));

const minifyFile = (filename) =>
  new Promise((resolve, reject) =>
    fs.readFile(filename, (err, data) => (err ? reject(err) : resolve(data))),
  )
    .then((originalBuffer) =>
      imagemin.buffer(originalBuffer, { plugins }).then((minimizedBuffer) => ({
        minimizedBuffer,
      })),
    )
    .then(
      ({ minimizedBuffer }) =>
        new Promise((resolve, reject) =>
          fs.writeFile(filename, minimizedBuffer, (err) =>
            err ? reject(err) : resolve(),
          ),
        ),
    );

Promise.resolve(process.argv)
  .then((x) => x.slice(2))
  .then((x) => x.map(minifyFile))
  .then((x) => Promise.all(x))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });