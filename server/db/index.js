const { Pool, Client } = require('pg');

const password = require('../config').pgPwd;

const connection = new Pool({
  user: 'postgres',
  host: 'localhost', // This will inevitably change
  database: 'questions-and-answers',
  password,
  port: 3211,
});
