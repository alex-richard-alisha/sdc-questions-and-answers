export const questions = {
  byProductId: (product_id) => `SELECT q.id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness,q.reported FROM qa.questions AS q WHERE q.product_id=${product_id} AND q.reported=0`,
};

export const answers = {
  byQuestionId:
    'SELECT a.id, a.body, a.date_written AS date, a.answerer_name, a.helpful AS helpfulness FROM qa.answers AS a WHERE a.question_id=($1) AND a.reported=false',
};

export const photos = {
  byAnswerId: (answer_id) => `SELECT p.photo_url FROM qa.qa_photos AS p WHERE p.answer_id=${answer_id}`,
};

// * Select all questions
export const joins = {
  // qa: 'SELECT q.id AS question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness,q.reported, a.id, a.body, a.date_written AS date, a.answerer_name, a.helpful AS helpfulness FROM qa.questions AS q FULL JOIN qa.answers AS a ON q.id=a.question_id WHERE q.product_id=($1) AND q.reported=0',
  qap: 'SELECT q.id AS question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness,q.reported, a.id AS answer_id, a.body AS answer_body, a.date_written AS answer_date, a.answerer_name, a.helpful AS answer_helpfulness, p.photo_url, p.answer_id FROM qa.questions AS q RIGHT JOIN qa.answers AS a ON q.id=a.question_id RIGHT JOIN qa.qa_photos as p ON a.id=p.answer_id WHERE q.product_id=($1) AND q.reported=0',
};
