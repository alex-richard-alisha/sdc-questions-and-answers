import express, { Request, Response } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import { fixPageAndCount, validateRequestStrings } from './utils';
import {
  insertPhotos,
  getQuestionsByProductId,
  getAnswersByQuestionId,
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
  postQuestion,
  postAnswer
} from './qa.services';
import queries from './db/queries';
import {
  CreateQuestionParams,
  GetQuestionsParams,
  GetAnswersParams,
  GetAnswersQueryParams,
  CreateAnswerBody,
  CreateAnswerParams,
  MarkQuestionHelpfulParams,
  MarkAnswerHelpfulParams,
  ReportAnswerParams,
  ReportQuestionParams
} from './queryTypes';

const app = express();

const PORT = 3000;

/* MIDDLEWARE */

const logStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs', 'file.log'),
  {
    flags: 'a'
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common', { stream: logStream }));

/* Questions List */
app.get(
  '/qa/questions',
  async (req: Request<null, null, null, GetQuestionsParams>, res: Response) => {
    const query = req.query;
    const product_id = query?.product_id;
    const count = query?.count;
    const page = query?.page;

    try {
      const { fixedPage, fixedCount, error } = fixPageAndCount(page, count);

      if (error) {
        return res.status(400).send('Error: count and page must be numbers');
      }

      const results = await getQuestionsByProductId(
        product_id,
        fixedPage,
        fixedCount
      );

      return res.status(200).send(results);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
);

/* Answers List */
app.get(
  '/qa/questions/:question_id/answers',
  async (
    req: Request<GetAnswersParams, null, null, GetAnswersQueryParams>,
    res: Response
  ) => {
    const params = req.params;
    const question_id = params?.question_id;
    const query = req.query;
    const count = query?.count;
    const page = query?.page;
    try {
      const { fixedPage, fixedCount, error } = fixPageAndCount(page, count);

      if (error) {
        return res.status(400).send('Error: count and page must be numbers');
      }

      const results = await getAnswersByQuestionId(
        question_id,
        fixedPage,
        fixedCount
      );

      res.status(200).send(results);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
);

/* Add a Question */
app.post(
  '/qa/questions',
  async (
    req: Request<null, null, CreateQuestionParams, null>,
    res: Response
  ) => {
    const body = req.body;
    const question_body = body?.body;
    const name = body?.name;
    const email = body?.email;
    const product_id = body?.product_id;

    try {
      const error = validateRequestStrings(question_body, name, email);

      if (error) {
        return res
          .status(400)
          .send('Error: question body, user name, and email must be strings');
      }

      await postQuestion(
        product_id,
        question_body,
        name,
        email,
        new Date().getTime()
      );

      return res.status(201).end();
    } catch (e) {
      console.error(`Could not post question, product_id=${product_id}`, e);
      res.status(500).send(e);
    }
  }
);

/* Add an Answer */
app.post(
  '/qa/questions/:question_id/answers',
  async (
    req: Request<CreateAnswerParams, null, CreateAnswerBody, null>,
    res: Response
  ) => {
    const body = req.body;
    const answer_body = body?.body;
    const name = body?.name;
    const photos = body?.photos;
    const email = body?.email;
    const params = req.params;
    const question_id = params?.question_id;

    try {
      const stringError = validateRequestStrings(answer_body, name, email);
      const photoError = validateRequestStrings(...photos);

      if (stringError || photoError) {
        return res
          .status(400)
          .send('Error: question body, user name, and email must be strings');
      }

      const result = await postAnswer(
        question_id,
        answer_body,
        name,
        email,
        new Date().getTime()
      );

      await insertPhotos(queries.photos.create, result.id, photos);
      res.status(200).send();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
);

/* Mark a Question as Helpful */
app.put(
  '/qa/questions/:question_id/helpful',
  async (req: Request<MarkQuestionHelpfulParams>, res: Response) => {
    const params = req.params;
    const question_id = params?.question_id;

    try {
      const error = validateRequestStrings(question_id);

      if (error) {
        return res
          .status(400)
          .send('Error: question body, user name, and email must be strings');
      }

      await markQuestionHelpful(question_id);
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
);

/* Report a Question */
app.put(
  '/qa/questions/:question_id/report',
  async (req: Request<ReportQuestionParams>, res: Response) => {
    const params = req.params;
    const question_id = params?.question_id;

    try {
      await reportQuestion(question_id);
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
);

/* Mark an Answer as Helpful */
app.put(
  '/qa/answers/:answer_id/helpful',
  async (req: Request<MarkAnswerHelpfulParams>, res: Response) => {
    const params = req.params;

    const answer_id = params?.answer_id;

    try {
      const error = validateRequestStrings(answer_id);

      if (error) {
        return res
          .status(400)
          .send('Error: question body, user name, and email must be strings');
      }

      await markAnswerHelpful(answer_id);
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
);

/* Report an Answer */
app.put(
  '/qa/answers/:answer_id/report',
  async (req: Request<ReportAnswerParams>, res: Response) => {
    const params = req.params;
    const answer_id = params?.answer_id;

    try {
      const error = validateRequestStrings(answer_id);

      if (error) {
        return res
          .status(400)
          .send('Error: question body, user name, and email must be strings');
      }

      await reportAnswer(answer_id);
      return res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on Port:${PORT}`);
});
