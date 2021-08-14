CREATE INDEX idx_product_id ON qa.questions(product_id);
CREATE INDEX idx_question_id ON qa.answers(question_id);

CREATE INDEX idx_answer_id ON qa.qa_photos(answer_id);