import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('process.env:', process.env);

const host =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_LOCAL_HOST
    : process.env.DB_HOST;

const connection = new Pool({
  user: `${process.env.DB_USER}`,
  host: `${host}` || 'sdc-postgres',
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
  port: parseInt(process.env.DB_PORT as string) || 5432,
  max: parseInt(process.env.DB_MAX as string) || 50
});

export const makeQuery = async function <T>(
  query: string,
  queryParams: (string | number | boolean)[]
): Promise<T[]> {
  try {
    const client = await connection.connect();

    console.log('making query:', query);
    console.log('queryParams:', queryParams);
    try {
      const { rows } = await client.query(query, [...queryParams]);
      console.log('rows', rows);
      client.release();
      return rows;
    } catch (e) {
      console.log('erroneous query');
      console.error(e);
      throw e;
    }
  } catch (e) {
    console.error('Could not make query:', e);
    throw e;
  }
};

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
