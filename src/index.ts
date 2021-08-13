import express, { Request, Response } from 'express';

import { fixPageAndCount, composeQuery } from './utils';
import { makeQuery } from './db/qa.services';
import queries from './db/queries';

const app = express();

const PORT = 3000;

// * Every route will need a postgres connection, and will release it at the end

/* MIDDLEWARE */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Questions List */
app.get('/qa/questions', async (req: Request, res: Response) => {
  try {
    console.debug('req.url:', req.url);

    const { product_id, count, page } = req.query;

    const { fixedPage, fixedCount, error } = fixPageAndCount(
      page as string,
      count as string,
    );

    if (error) {
      return res.status(400).send('Error: count and page must be numbers');
    }

    const result = await makeQuery(
      composeQuery(queries.answers.byQuestionId, fixedCount, fixedPage),
      [product_id as string],
    );
    return res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

/* Answers List */
app.get(
  '/qa/questions/:question_id/answers',
  async (req: Request, res: Response) => {
    try {
      const { question_id } = req.params;
      const { count, page } = req.query;
      const { fixedPage, fixedCount, error } = fixPageAndCount(
        page as string,
        count as string,
      );

      if (error) {
        return res.status(400).send('Error: count and page must be numbers');
      }

      const result = await makeQuery(
        composeQuery(queries.answers.byQuestionId, fixedCount, fixedPage),
        [question_id],
      );
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
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
