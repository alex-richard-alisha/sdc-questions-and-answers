-- ---
-- Reset Tables
-- ---
DROP DATABASE IF EXISTS questions_and_answers;

CREATE DATABASE questions_and_answers;

\c questions_and_answers;

DROP SCHEMA IF EXISTS qa CASCADE;

CREATE SCHEMA qa;

CREATE TABLE IF NOT EXISTS qa.questions (
	id BIGSERIAL PRIMARY KEY,
	product_id INT NOT NULL,
	question_body TEXT NOT NULL,
	question_date BIGINT NOT NULL,
	asker_name TEXT NOT NULL,
	asker_email TEXT NOT NULL,
	reported BOOLEAN NOT NULL,
	question_helpfulness INT NOT NULL
);

CREATE TABLE IF NOT EXISTS qa.answers (
  id BIGSERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  answer_body TEXT NOT NULL,
  answer_date BIGINT NOT NULL,
  answerer_name TEXT NOT NULL,
	answerer_email TEXT NOT NULL,
	reported BOOLEAN NOT NULL,
  answer_helpfulness INT NOT NULL
);


CREATE TABLE IF NOT EXISTS qa.qa_photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  photo_url TEXT NOT NULL
);

ALTER TABLE qa.answers ADD FOREIGN KEY (question_id) REFERENCES qa.questions (id) ON DELETE CASCADE;
ALTER TABLE qa.qa_photos ADD FOREIGN KEY (answer_id) REFERENCES qa.answers (id) ON DELETE CASCADE;

-- ---
-- Seed Database
-- ---

COPY qa.questions (id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/seed/questions.csv' DELIMITER ',' CSV HEADER;
COPY qa.answers (id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) FROM '/seed/answers.csv' DELIMITER ',' CSV HEADER;
COPY qa.qa_photos(id, answer_id, photo_url) FROM '/seed/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- ---
-- Fix Serialization
-- ---

SELECT pg_catalog.setval(pg_get_serial_sequence('qa.qa_photos', 'id'), (SELECT MAX(id) FROM qa.qa_photos)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('qa.answers', 'id'), (SELECT MAX(id) FROM qa.answers)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('qa.questions', 'id'), (SELECT MAX(id) FROM qa.questions)+1);

-- ---
-- Index Tables
-- ---

CREATE INDEX idx_product_id ON qa.questions(product_id);
CREATE INDEX idx_question_id ON qa.answers(question_id);
CREATE INDEX idx_answer_id ON qa.qa_photos(answer_id);
