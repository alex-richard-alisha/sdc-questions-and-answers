import { Pool, PoolClient } from 'pg';

// import pg from 'pg';

// pg.connect

const connection = new Pool({
  user: 'postgres',
  host: 'localhost', // * This will inevitably change
  database: 'questions-and-answers',
  password: 'postgres',
  port: 5432,
	max: 50,
});

connection.on('connect', (client: PoolClient) => {
  console.log(`Client connect`);
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
