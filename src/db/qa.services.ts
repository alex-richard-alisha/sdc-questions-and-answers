import connection from './index';

export const makeQuery = async (query: string, queryParams: string[]) => {
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
    }
  } catch (e) {
    console.log('connection could not be established');
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