import { Pool } from 'pg';
import { pgPwd as password } from '../../config';

const connection = new Pool({
  user: 'postgres',
  host: 'localhost', // * This will inevitably change
  database: 'questions-and-answers',
  password: 'postgres',
  port: 5432,
});

export default connection;
