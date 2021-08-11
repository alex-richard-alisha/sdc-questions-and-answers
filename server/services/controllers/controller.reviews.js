import express from 'express';

const app = express();

app.use(express.json());

/* Questions List */
app.get('/qa/questions', (req, res) => {});
/* Answers List */
app.get('/qa/questions/:question_id/answers', (req, res) => {});
/* Add a Question */
app.post('/qa/questions', (req, res) => {});
/* Add an Answer */
app.post('/qa/questions/:question_id/answers', (req, res) => {});
/* Mark a Question as Helpful */
app.put('/qa/questions/:question_id/helpful', (req, res) => {});
/* Report a Question */
app.put('/qa/questions/:question_id/report', (req, res) => {});
/* Mark an Answer as Helpful */
app.put('/qa/answers/:answer_id/helpful', (req, res) => {});
/* Report an Answer */
app.put('/qa/answers/:answer_id/report', (req, res) => {});
