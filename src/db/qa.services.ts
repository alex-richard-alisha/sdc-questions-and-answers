import connection from './index';

export const makeQuery = async (query: string, queryParams: string[]) => {
  // * Q: Try-Catch here?
  try {
    const client = await connection.connect();

    const { rows } = await client.query(query, [...queryParams]);

    client.release();
    return rows;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const insertPhotos = async (
  photoQuery: string,
  answer_id: string,
  urls: string[],
): Promise<void> => {
  for (let i = 0; i < urls.length; i++) {
    await makeQuery(photoQuery, [answer_id, urls[i]]);
  }
};
