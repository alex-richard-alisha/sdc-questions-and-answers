export interface QuestionsResult {
  product_id: string;
  results: QuestionQueryResult[];
}

export interface AnswersResult {
  question: string;
  page: number;
  count: number;
  results: AnswerQueryResult[];
}

export interface AnswerPostResult {
  id: string;
}

export interface PhotoQueryResult {
  photo_url: string;
}

export interface PhotosQueryResult {
  photos: PhotoQueryResult[] | [];
}

export interface AnswerQueryResult {
  id: number;
  photos: PhotosQueryResult;
  answer_body: string;
  answer_date: number;
  answerer_name: string;
  answer_helpfulness: string;
}

export interface QuestionQueryResult {
  question_id: number;
  question_body: string;
  question_date: string;
  asker_name: string;
  question_helpfulness: number;
  reported: boolean;
  answers: AnswerQueryResult;
}

/* Request Types */

export interface GetQuestionsParams {
  product_id: string;
  count: string;
  page: string;
}

export interface CreateQuestionParams {
  body: string;
  name: string;
  email: string;
  product_id: string;
}

export interface GetAnswersQueryParams {
  count: string;
  page: string;
}

export interface GetAnswersParams {
  question_id: string;
}

export interface CreateAnswerParams {
  question_id: string;
}

export interface CreateAnswerBody {
  body: string;
  name: string;
  photos: string[];
  email: string;
  question: string;
}

export interface MarkQuestionHelpfulParams {
  question_id: string;
}

export interface ReportQuestionParams {
  question_id: string;
}

export interface MarkAnswerHelpfulParams {
  answer_id: string;
}

export interface ReportAnswerParams {
  answer_id: string;
}
