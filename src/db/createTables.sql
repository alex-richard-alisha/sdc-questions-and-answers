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

-- JJ Create qa=# create table questions (id serial primary key, product_id int not null, question_body varchar(1000) not null, question_date bigint not null, asker_name varchar(60) not null, asker_email varchar(60) not null, reported boolean, helpful int);

-- ---
-- Table 'Answers'
--
-- ---

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

-- ---
-- Table 'QA_Photos'
--
-- ---

CREATE TABLE IF NOT EXISTS qa.qa_photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NULL DEFAULT NULL,
  photo_url TEXT NULL DEFAULT NULL
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE qa.answers ADD FOREIGN KEY (question_id) REFERENCES qa.questions (id) ON DELETE CASCADE;
ALTER TABLE qa.qa_photos ADD FOREIGN KEY (answer_id) REFERENCES qa.answers (id) ON DELETE CASCADE;

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