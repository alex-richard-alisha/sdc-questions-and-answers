import { Pool, PoolClient } from 'pg';
import { password } from '../../config';

const connection = new Pool({
  user: 'postgres',
  host: 'sdc-postgres', // * localhost if local, container name if Docker
  database: 'questions_and_answers',
  password,
  port: 5432,
  max: 50
});

export const makeQuery = async function <T>(
  query: string,
  queryParams: (string | number | boolean)[]
): Promise<T[]> {
  try {
    const client = await connection.connect();

    console.log('making query:', query);
    try {
      const { rows } = await client.query(query, [...queryParams]);
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
