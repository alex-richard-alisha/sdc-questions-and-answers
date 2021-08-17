import { Pool, PoolClient } from 'pg';

const connection = new Pool({
  user: 'postgres',
  host: 'sdc-postgres', // * localhost if local, container name if Docker
  database: 'questions_and_answers',
  password: 'postgres',
  port: 5432,
	max: 50,
});

connection.on('connect', (client: PoolClient) => {
  console.log(`Client connected`);
});

connection.on('acquire', (client: PoolClient) => {
  console.log(`Client acquired`);
});

connection.on('error', (err: Error, client: PoolClient) => {
  console.log(`Error: ${err}`);
});

connection.on('remove', (client: PoolClient) => {
  console.log(`Client removed`);
});

export default connection;
