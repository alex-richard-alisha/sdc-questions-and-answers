import connection from './index';

export const makeQuery = async (query: string, queryParams: string[]) => {
  // * Q: Try-Catch here?
  const client = await connection.connect();

  const { rows } = await client.query(query, [...queryParams]);

  client.release();
  return rows;
};
