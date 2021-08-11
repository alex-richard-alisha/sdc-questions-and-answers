// todo: rewrite as https://c2fo.github.io/fast-csv/docs/parsing/methods

const fs = require('fs');
const fastcsv = require('fast-csv');

// Read in one line of the file

const readFile = (path) => {
  const stream = fs.createReadStream(path);
  const csvData = [];
  const csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      csvData.push(data);
    })
    .on('end', () => {
      csvData.shift();
    });

  stream.pipe(csvStream);
};
