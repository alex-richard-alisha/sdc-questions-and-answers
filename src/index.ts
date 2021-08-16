import express, { Request, Response } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import { fixPageAndCount, composeQuery, validateRequestStrings } from './utils';
import { makeQuery, insertPhotos } from './db/qa.services';
import queries from './db/queries';

const app = express();

const PORT = 3000;

// * Every route will need a postgres connection, and will release it at the end

/* MIDDLEWARE */

let logStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs', 'file.log'),
  {
    flags: 'a',
  },
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common', { stream: logStream }));

/* Questions List */
app.get('/qa/questions', async (req: Request, res: Response) => {
  try {
    const { product_id, count, page } = req.query;

    const { fixedPage, fixedCount, error } = fixPageAndCount(
      page as string,
      count as string,
    );

    if (error) {
      return res.status(400).send('Error: count and page must be numbers');
    }

    const results = await makeQuery(
      composeQuery(queries.aggregates.all, fixedCount, fixedPage),
      [product_id as string],
    );
    return res.status(200).send({ product_id, results });
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

      const results = await makeQuery(
        composeQuery(queries.aggregates.answers, fixedCount, fixedPage),
        [question_id],
      );
      res.status(200).send({
        question: question_id,
        page: fixedPage,
        count: fixedCount,
        results,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  },
);

/* Add a Question */
app.post('/qa/questions', async (req: Request, res: Response) => {
  try {
    const d = new Date().getTime();
    const { body, name, email, product_id } = req.body;
    const error = validateRequestStrings(body, name, email);

    if (error) {
      return res
        .status(400)
        .send('Error: question body, user name, and email must be strings');
    }

    const result = await makeQuery(queries.questions.create, [
      product_id,
      body,
      d,
      name,
      email,
    ]);
    return res.status(201).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

/* Add an Answer */
app.post(
  '/qa/questions/:question_id/answers',
  async (req: Request, res: Response) => {
    try {
      const { question_id } = req.params;
      const { body, name, email, photos } = req.body;

      const stringError = validateRequestStrings(body, name, email);
      // TODO photo error validation

      if (stringError) {
        return res
          .status(400)
          .send('Error: question body, user name, and email must be strings');
      }

      const result = await makeQuery(queries.answers.create, [
        question_id,
        body,
        new Date().getTime(),
        name,
        email,
      ]);

      console.log('result:', result);

      const answerId = (result as any)[0].id; // TODO: FIX ME

      await insertPhotos(queries.photos.create, answerId, photos);
      res.status(200).send();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  },
);

/* Mark a Question as Helpful */
app.put(
  '/qa/questions/:question_id/helpful',
  async (req: Request, res: Response) => {
    try {
      const { question_id } = req.params;
      await makeQuery(queries.questions.markHelpful, [question_id]);
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  },
);

/* Report a Question */
app.put(
  '/qa/questions/:question_id/report',
  async (req: Request, res: Response) => {
    try {
      const { question_id } = req.params;
      await makeQuery(queries.questions.report, [question_id]);
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  },
);

/* Mark an Answer as Helpful */
app.put(
  '/qa/answers/:answer_id/helpful',
  async (req: Request, res: Response) => {
    try {
      const { answer_id } = req.params;
      await makeQuery(queries.answers.markHelpful, [answer_id]);
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  },
);

/* Report an Answer */
app.put(
  '/qa/answers/:answer_id/report',
  async (req: Request, res: Response) => {
    try {
      const { answer_id } = req.params;
      await makeQuery(queries.answers.report, [answer_id]);
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server listening on Port:${PORT}`);
});
