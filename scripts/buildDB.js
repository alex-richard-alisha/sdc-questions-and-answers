const fs = require('fs');
const path = require('path');

const inFilePath = path.join(__dirname, '..', 'src', 'db', 'buildTables.sql');

let dataPath = path.join(__dirname, '..', 'data');

if (process.env.NODE_ENV === 'production') {
  dataPath = path.join(__dirname, '..', 'data', 'src');
}

const sql = fs.readFileSync(inFilePath).toString();

console.log(sql.replace(/\{\}/g, dataPath));
