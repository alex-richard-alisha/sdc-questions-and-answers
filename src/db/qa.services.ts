import connection from './index';
import {
  QuestionQueryResult,
  AnswersResult,
  AnswerQueryResult,
  QuestionsResult,
  AnswerPostResult,
} from 'src/db/queryTypes';
import { composeQuery } from '../utils';
import queries from '../db/queries';

export const makeQuery = async function <T>(
  query: string,
  queryParams: (string | number | boolean)[],
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
      return [];
    }
  } catch (e) {
    console.error('Could not make query:', e);
    // throw e;
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
  name: string,
  email: string,
  date: number,
): Promise<void[]> => {
  try {
    return await makeQuery<void>(queries.questions.create, [
      product_id,
      body,
      name,
      email,
      date,
    ]);
  } catch (e) {
    throw e;
  }
};

export const postAnswer = async (
  question_id: string,
  body: string,
  name: string,
  email: string,
  date: number,
): Promise<AnswerPostResult> => {
  const result = await makeQuery<AnswerPostResult>(queries.answers.create, [
    question_id,
    body,
    name,
    email,
    date,
  ]);
  return result[0];
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
