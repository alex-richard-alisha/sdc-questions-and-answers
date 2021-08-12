// const { Pool, Client } = require('pg');
import { Pool, Client } from 'pg';

// const password = require('../config').pgPwd;
import { pgPwd as password } from '../../config';

const connectionConfig = {
  user: 'postgres',
  host: 'localhost', // This will inevitably change
  database: 'questions-and-answers',
  password,
  port: 5432,
};

// const connection = new Pool();

export default connectionConfig;
