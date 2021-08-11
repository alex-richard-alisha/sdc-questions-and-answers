-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Questions'
--
-- ---

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE IF EXISTS qa.answers ADD FOREIGN KEY (question_id) REFERENCES qa.questions (id) ON DELETE CASCADE;
-- ALTER TABLE IF EXISTS qa.qa_photos ADD FOREIGN KEY (answer_id) REFERENCES qa.answers (id) ON DELETE CASCADE;

-- DROP SCHEMA IF EXISTS qa;

-- ---
-- DESTROY ALL TABLES
-- ---

DROP TABLE IF EXISTS qa.qa_photos;
DROP TABLE IF EXISTS qa.answers;

DROP TABLE IF EXISTS qa.questions;

DROP SCHEMA IF EXISTS qa;


CREATE SCHEMA IF NOT EXISTS qa;

-- DROP TABLE IF EXISTS qa.questions;

CREATE TABLE IF NOT EXISTS qa.questions (
	id INT PRIMARY KEY DEFAULT 0,
	product_id INT NULL DEFAULT NULL,
	question_body TEXT NULL DEFAULT NULL,
	question_date BIGINT NULL DEFAULT NULL,
	asker_name TEXT NULL DEFAULT NULL,
	asker_email TEXT NULL DEFAULT NULL,
	reported INT NULL DEFAULT NULL,
	question_helpfulness INT NULL DEFAULT NULL
);

-- ---
-- Table 'Answers'
--
-- ---

-- DROP TABLE IF EXISTS qa.answers;

CREATE TABLE IF NOT EXISTS qa.answers (
  id INT PRIMARY KEY,
  question_id INT NULL DEFAULT NULL,
  body TEXT NULL DEFAULT NULL,
  date_written BIGINT NULL DEFAULT NULL,
  answerer_name TEXT NULL DEFAULT NULL,
	answerer_email TEXT NULL DEFAULT NULL,
	reported BOOLEAN NULL DEFAULT NULL,
  helpful INT NULL DEFAULT NULL
);

-- ---
-- Table 'QA_Photos'
--
-- ---

-- DROP TABLE IF EXISTS qa.qa_photos;

CREATE TABLE IF NOT EXISTS qa.qa_photos (
  id INT PRIMARY KEY,
  answer_id INT NULL DEFAULT NULL,
  photo_url TEXT NULL DEFAULT NULL
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE qa.answers ADD FOREIGN KEY (question_id) REFERENCES qa.questions (id) ON DELETE CASCADE;
ALTER TABLE qa.qa_photos ADD FOREIGN KEY (answer_id) REFERENCES qa.answers (id) ON DELETE CASCADE;

-- ---
-- COPY COMMANDS
-- ---

-- COPY qa.questions (id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/questions.csv' DELIMITER ',' CSV HEADER;
-- COPY qa.answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/answers.csv' DELIMITER ',' CSV HEADER;
-- COPY qa.qa_photos(id, answer_id, photo_url) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE QA_Photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Questions (id,product_id,question_body,question_date,asker_name,question_helpfulness,reported) VALUES
-- ('','','','','','','');
-- INSERT INTO Answers (id,answer_body,answer_date,answerer_name,answer_helpfulness,question_id) VALUES
-- ('','','','','','');
-- INSERT INTO QA_Photos (id,answer_id,url) VALUES
-- ('','','');