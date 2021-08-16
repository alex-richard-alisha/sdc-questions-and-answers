import connection from './index';
import {
  QuestionQueryResult,
  AnswersResult,
  AnswerQueryResult,
  QuestionsResult,
} from 'src/db/queryTypes';
import {
  fixPageAndCount,
  composeQuery,
  validateRequestStrings,
} from '../utils';
import queries from '../db/queries';

export const makeQuery = async function <T>(
  query: string,
  queryParams: (string | number | boolean)[],
): Promise<T[]> {
  try {
    const client = await connection.connect();

    console.log('making query:', query);

    const { rows } = await client.query(query, [...queryParams]);

    client.release();
    return rows;
  } catch (e) {
    console.error('Could not make query:', e);
    throw e;
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

export const getQuestionsByProductId = async (
  product_id: string,
  page: number,
  count: number,
): Promise<QuestionsResult> => {
  const results = await makeQuery<QuestionQueryResult>(
    composeQuery(queries.aggregates.all, count, page),
    [product_id],
  );

  return { product_id, results };
};

export const getAnswersByQuestionId = async (
  question_id: string,
  page: number,
  count: number,
): Promise<AnswersResult> => {
  const results = await makeQuery<AnswerQueryResult>(
    composeQuery(queries.aggregates.answers, count, page),
    [question_id],
  );

  return {
    question: question_id,
    page,
    count,
    results,
  };
};

export const postQuestion = async (
  product_id: string,
  body: string,
  d: number,
  name: string,
  email: string,
): Promise<void[]> => {
  return await makeQuery<void>(queries.questions.create, [
    product_id,
    body,
    d,
    name,
    email,
  ]);
};

export const markQuestionHelpful = async (
  question_id: string,
): Promise<void> => {
  await makeQuery<string>(queries.questions.markHelpful, [question_id]);
};

export const reportQuestion = async (question_id: string): Promise<void> => {
  await makeQuery<void>(queries.questions.report, [question_id]);
};

export const markAnswerHelpful = async (answer_id: string): Promise<void> => {
  await makeQuery<void>(queries.answers.markHelpful, [answer_id]);
};

export const reportAnswer = async (answer_id: string): Promise<void> => {
  await makeQuery<void>(queries.answers.report, [answer_id]);
};
