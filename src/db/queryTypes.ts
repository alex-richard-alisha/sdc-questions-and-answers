export interface AnswerPostResult {
	id: number;
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
