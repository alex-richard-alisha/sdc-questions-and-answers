import { makeQuery } from './db/index';
import {
  QuestionQueryResult,
  AnswersResult,
  AnswerQueryResult,
  QuestionsResult,
  AnswerPostResult
} from './queryTypes';
import { addLimitAndOffsetToQuery } from './utils';
import queries from './db/queries';

export const insertPhotos = async (
  photoQuery: string,
  answer_id: string,
  urls: string[]
): Promise<void> => {
  for (let i = 0; i < urls.length; i++) {
    await makeQuery(photoQuery, [answer_id, urls[i]]);
  }
};

export const getQuestionsByProductId = async (
  product_id: string,
  page: number,
  count: number
): Promise<QuestionsResult> => {
  const results = await makeQuery<QuestionQueryResult>(
    addLimitAndOffsetToQuery(queries.aggregates.all, page, count),
    [product_id]
  );

  return { product_id, results };
};

export const getAnswersByQuestionId = async (
  question_id: string,
  page: number,
  count: number
): Promise<AnswersResult> => {
  const results = await makeQuery<AnswerQueryResult>(
    addLimitAndOffsetToQuery(queries.aggregates.answers, page, count),
    [question_id]
  );

  return {
    question: question_id,
    page,
    count,
    results
  };
};

export const postQuestion = async (
  product_id: string,
  body: string,
  name: string,
  email: string,
  date: number
): Promise<void[]> => {
  return await makeQuery<void>(queries.questions.create, [
    product_id,
    body,
    name,
    email,
    date
  ]);
};

export const postAnswer = async (
  question_id: string,
  body: string,
  name: string,
  email: string,
  date: number
): Promise<AnswerPostResult> => {
  const result = await makeQuery<AnswerPostResult>(queries.answers.create, [
    question_id,
    body,
    name,
    email,
    date
  ]);
  return result[0];
};

export const markQuestionHelpful = async (
  question_id: string
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
