const { Pool, Client } = require('pg');

const password = require('../config').pgPwd;

const connectionConfig = {
  user: 'postgres',
  host: 'localhost', // This will inevitably change
  database: 'questions-and-answers',
  password,
  port: 5432,
};

// const connection = new Pool();

export default connectionConfig;
