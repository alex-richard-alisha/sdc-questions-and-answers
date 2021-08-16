export default {
  questions: {
    create:
      'INSERT INTO qa.questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, false, 0)',
    markHelpful:
      'UPDATE qa.questions SET question_helpfulness=question_helpfulness+1 WHERE id=$1',
    report: 'UPDATE qa.questions SET reported=true WHERE id=$1',
  },
  answers: {
    create:
      'INSERT INTO qa.answers (question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) VALUES ($1, $2, $3, $4, $5, false, 0) RETURNING qa.answers.id',
    markHelpful:
      'UPDATE qa.answers SET answer_helpfulness=answer_helpfulness+1 WHERE id=$1',
    report: 'UPDATE qa.answers SET reported=true WHERE id=$1',
  },
  photos: {
    create: 'INSERT INTO qa.qa_photos (answer_id, photo_url) VALUES ($1, $2)',
  },
  aggregates: {
    all: `SELECT q.id as question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported,
				(SELECT coalesce(jsonb_object_agg(id, answer), '{}') FROM
					(SELECT a.id, a.answer_body, a.answer_date, a.answerer_name, a.answer_helpfulness,
						(SELECT coalesce(jsonb_agg(photo), '[]') FROM
							(SELECT p.photo_url FROM qa.qa_photos AS p WHERE p.answer_id=a.id)
						photo)
						AS photos FROM qa.answers AS a WHERE a.question_id=q.id)
					answer) AS
				answers FROM qa.questions AS q WHERE q.product_id=$1`,
    answers: `SELECT a.id, a.answer_body, a.answer_date, a.answerer_name, a.answer_helpfulness,
								(SELECT coalesce(jsonb_agg(photo), '[]') FROM
									(SELECT p.photo_url FROM qa.qa_photos AS p WHERE p.answer_id=a.id)
								photo)
								AS photos FROM qa.answers AS a WHERE a.question_id=$1`,
  },
};
