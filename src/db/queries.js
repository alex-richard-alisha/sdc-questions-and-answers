export default {
  questions: {
    byProductId:
      'SELECT q.id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness,q.reported FROM qa.questions AS q WHERE q.product_id=($1) AND q.reported=false',
    create:
      'INSERT INTO qa.questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, 0, 0)',
  },
  answers: {
    byQuestionId:
      'SELECT a.id, a.answer_body, a.answer_date, a.answerer_name, a.answer_helpfulness FROM qa.answers AS a WHERE a.question_id=($1) AND a.reported=false',
    create:
      'INSERT INTO qa.answers (question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) VALUES ($1, $2, $3, $4, $5, false, 0) RETURNING qa.answers.id',
  },
  photos: {
    byAnswerId:
      'SELECT p.photo_url FROM qa.qa_photos AS p WHERE p.answer_id=($1)',
    create: 'INSERT INTO qa.qa_photos (answer_id, photo_url) VALUES ($1, $2)',
  },
  joins: {
    // * Select all questions and answers
    qa: 'SELECT q.id AS question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported, a.id, a.answer_body, a.answer_date, a.answerer_name, a.answer_helpfulness FROM qa.questions AS q FULL JOIN qa.answers AS a ON q.id=a.question_id WHERE q.product_id=($1) AND q.reported=0',
    // * Selects all questions, answers, and photos
    all: 'SELECT q.id AS question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported, a.id AS answer_id, a.answer_body, a.date_written AS answer_date, a.answerer_name, a.answer_helpfulness, p.photo_url, p.answer_id FROM qa.questions AS q RIGHT JOIN qa.answers AS a ON q.id=a.question_id RIGHT JOIN qa.qa_photos as p ON a.id=p.answer_id WHERE q.product_id=($1) AND q.reported=0',
  },
  aggs: {
    qa: 'SELECT q.id',
  },
};
