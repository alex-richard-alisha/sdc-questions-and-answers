
DROP TABLE IF EXISTS qa.qa_photos;
DROP TABLE IF EXISTS qa.answers;
DROP TABLE IF EXISTS qa.questions;
DROP SCHEMA IF EXISTS qa;
CREATE SCHEMA IF NOT EXISTS qa;

CREATE TABLE IF NOT EXISTS temp_questions (
	id INT PRIMARY KEY,
	product_id INT NULL DEFAULT NULL,
	question_body TEXT NULL DEFAULT NULL,
	question_date BIGINT NULL DEFAULT NULL,
	asker_name TEXT NULL DEFAULT NULL,
	asker_email TEXT NULL DEFAULT NULL,
	reported BOOLEAN NULL DEFAULT NULL,
	question_helpfulness INT NULL DEFAULT NULL
);

COPY temp_questions (id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/questions.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE IF NOT EXISTS qa.questions (
	id SERIAL PRIMARY KEY,
	product_id INT NULL DEFAULT NULL,
	question_body TEXT NULL DEFAULT NULL,
	question_date BIGINT NULL DEFAULT NULL,
	asker_name TEXT NULL DEFAULT NULL,
	asker_email TEXT NULL DEFAULT NULL,
	reported BOOLEAN NULL DEFAULT NULL,
	question_helpfulness INT NULL DEFAULT NULL
);

INSERT INTO qa.questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) SELECT product_id, question_body, question_date, asker_name, asker_email, reported,
question_helpfulness FROM temp_questions;

DROP TABLE temp_questions;

CREATE TABLE IF NOT EXISTS temp_answers (
	id INT PRIMARY KEY,
  question_id INT NULL DEFAULT NULL,
  answer_body TEXT NULL DEFAULT NULL,
  answer_date BIGINT NULL DEFAULT NULL,
  answerer_name TEXT NULL DEFAULT NULL,
	answerer_email TEXT NULL DEFAULT NULL,
	reported BOOLEAN NULL DEFAULT NULL,
  answer_helpfulness INT NULL DEFAULT NULL
);

COPY temp_answers (id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/answers.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE IF NOT EXISTS qa.answers (
  id SERIAL PRIMARY KEY,
  question_id INT NULL DEFAULT NULL,
  answer_body TEXT NULL DEFAULT NULL,
  answer_date BIGINT NULL DEFAULT NULL,
  answerer_name TEXT NULL DEFAULT NULL,
	answerer_email TEXT NULL DEFAULT NULL,
	reported BOOLEAN NULL DEFAULT NULL,
  answer_helpfulness INT NULL DEFAULT NULL
);

INSERT INTO qa.answers (question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) SELECT question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness FROM temp_answers;


DROP TABLE temp_answers;
CREATE TABLE IF NOT EXISTS temp_photos (
	id INT PRIMARY KEY,
  answer_id INT NULL DEFAULT NULL,
  photo_url TEXT NULL DEFAULT NULL
);

COPY temp_photos(id, answer_id, photo_url) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE IF NOT EXISTS qa.qa_photos (
	id SERIAL PRIMARY KEY,
  answer_id INT NULL DEFAULT NULL,
  photo_url TEXT NULL DEFAULT NULL
);

INSERT INTO qa.qa_photos (answer_id, photo_url) SELECT answer_id, photo_url FROM temp_photos;

DROP TABLE temp_photos;

select row_to_json(art) as artists
from(
  select a.id, a.name,
  (select json_agg(alb)
  from (
    select * from albums where artist_id = a.id
  ) alb
) as albums
from artists as a) art;

-- select row_to_json(art) as artists
-- from(
--   select a.id, a.name,
--   (select json_agg(alb)
--   from (
--     select * from albums where artist_id = a.id
--   ) alb
-- ) as albums
-- from artists as a) art;

-- SELECT jsonb_object_agg(question) FROM (SELECT q.id as question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported, (SELECT jsonb_object_agg(answer_id) FROM (SELECT a.id as answer_id, a.answer_body, a.answer_date, a.answerer_name, a.answer_helpfulness, (SELECT array_agg(photo) FROM (SELECT p.photo_url FROM qa.qa_photos AS p WHERE p.answer_id=a.id) photo) as photos FROM qa.answers AS a WHERE a.question_id=question_id) answer_id) as answers) question FROM qa.questions AS q WHERE q.product_id=$1;
