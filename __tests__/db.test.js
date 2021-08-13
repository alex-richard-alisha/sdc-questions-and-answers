import { Pool, Client } from 'pg';
import connectionConfig from '../src/server/db';

// TODO: MOCK OUT DATABASE, make relevant beyond the scope of me

describe('basic connection tests', () => {
  let pool;
  beforeEach(() => {
    pool = new Pool(connectionConfig);
  });

  it('has a working connection', () => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error(err);
      } else {
        const limit = 1;
        const start = 1;
        client.query(
          `SELECT * FROM qa.questions LIMIT ${limit} OFFSET ${start}`,
          (err, results) => {
            if (err) {
              console.error(err);
            } else {
              const {
                id,
                product_id,
                question_body,
                question_date,
                asker_name,
                asker_email,
                reported,
                question_helpfulness,
              } = results[0];
              expect(id).toBe(2);
              expect(product_id).toBe(1);
              expect(question_body).toBe(1);
              expect(question_date).toBe(1613888219613);
              expect(asker_name).toBe('jbilas');
              expect(asker_email).toBe('first.last@gmail.com');
              expect(reported).toBe(1);
              expect(question_helpfulness).toBe(4);
            }
          },
        );
      }
    });
  });
});
