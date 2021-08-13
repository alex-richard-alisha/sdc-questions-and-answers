import express, { Request, Response } from 'express';
import connection from './db';

import { questions, answers, photos, joins } from './db/queries';

import { validateQueryNumbers, composeQuery } from './utils';

const app = express();

const PORT = 3000;

// * Every route will need a postgres connection, and will release it at the end

/* MIDDLEWARE */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Questions List */
app.get('/qa/questions', async (req: Request, res: Response) => {
  console.debug('req.url:', req.url);
  let client;

  try {
    const { product_id, count, page } = req.query;

    const fixedCount = parseInt(count as string);
    const fixedPage = parseInt(page as string);
    const error = validateQueryNumbers(fixedCount, fixedPage);

    if (error) {
      return res.status(400).send('Error: count and page must be numbers');
    }

    const query = composeQuery(joins.qap, fixedCount, fixedPage);

    console.debug('query:', query);

    client = await connection.connect();

    const { rows } = await client.query(query, [product_id]);

    res.status(200).send(rows);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  } finally {
    client ? client.release() : null;
  }
});

/* Answers List */
app.get(
  '/qa/questions/:question_id/answers',
  async (req: Request, res: Response) => {
    let client;
    try {
      const { question_id } = req.params;
      const { count, page } = req.query;
      const fixedCount = parseInt(count as string);
      const fixedPage = parseInt(page as string);
      const error = validateQueryNumbers(fixedCount, fixedPage);

      if (error) {
        return res.status(400).send('Error: count and page must be numbers');
      }

      client = await connection.connect();

      const query = composeQuery(answers.byQuestionId, fixedCount, fixedPage);

      const { rows } = await client.query(query, [question_id]);
      res.status(200).send(rows);
    } catch (e) {
      console.error(e);
    } finally {
      client ? client.release() : null;
    }
  },
);

/* Add a Question */
app.post('/qa/questions', (req: Request, res: Response) => {});

/* Add an Answer */
app.post(
  '/qa/questions/:question_id/answers',
  (req: Request, res: Response) => {},
);

/* Mark a Question as Helpful */
app.put(
  '/qa/questions/:question_id/helpful',
  (req: Request, res: Response) => {},
);

/* Report a Question */
app.put(
  '/qa/questions/:question_id/report',
  (req: Request, res: Response) => {},
);

/* Mark an Answer as Helpful */
app.put('/qa/answers/:answer_id/helpful', (req: Request, res: Response) => {});

/* Report an Answer */
app.put('/qa/answers/:answer_id/report', (req: Request, res: Response) => {});

app.listen(PORT, () => {
  console.log(`Server listening on Port:${PORT}`);
});
