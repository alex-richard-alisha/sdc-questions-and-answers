import express, { Request, Response } from 'express';

const app = express();

const PORT = 3000;

/* MIDDLEWARE */

app.use(express.json());

/* Questions List */
app.get('/qa/questions', (req: Request, res: Response) => {});
/* Answers List */
app.get(
  '/qa/questions/:question_id/answers',
  (req: Request, res: Response) => {},
);
/* Add a Question */
app.post('/qa/questions', (req: Request, res: Response) => {});
/* Add an Answer */
app.post(
  '/qa/questions/:question_id/answers',
  (req: Request, res: Response) => {},
);
/* Mark a Question as Helpful */
app.put(
  '/qa/questions/:question_id/helpful',
  (req: Request, res: Response) => {},
);
/* Report a Question */
app.put(
  '/qa/questions/:question_id/report',
  (req: Request, res: Response) => {},
);
/* Mark an Answer as Helpful */
app.put('/qa/answers/:answer_id/helpful', (req: Request, res: Response) => {});
/* Report an Answer */
app.put('/qa/answers/:answer_id/report', (req: Request, res: Response) => {});

app.listen(PORT, () => {
  console.log(`Server listening on Port:${PORT}`);
});
