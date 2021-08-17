COPY qa.questions (id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/questions.csv' DELIMITER ',' CSV HEADER;
COPY qa.answers (id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/answers.csv' DELIMITER ',' CSV HEADER;
COPY qa.qa_photos(id, answer_id, photo_url) FROM '/mnt/d/ProgrammingProjects/sdc-questions-and-answers/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- JJ Copy Import: copy questions from ‘/Users/jjmarquis/Desktop/galvanize/sdc/questions.csv’ delimiter ‘,’ csv header;
