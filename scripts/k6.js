import http from 'k6/http';
import { sleep, check } from 'k6';
// import { Counter } from 'k6/metrics';

// import GetQuestions from '../__tests__/data/GetQuestions';

export const options = {
  stages: [
    { target: 100, duration: '5s' }
    // { target: 15, duration: '10s' },
    // { target: 0, duration: '10s' },
  ]
  // thresholds: {
  //   requests: ['count < 100'],
  // },
};

export default function () {
  const baseURL = 'http://localhost:3000/qa/questions';
  const productId = Math.ceil(Math.random() * 20);
  const questionId = Math.ceil(Math.random() * 20);
  const res1 = http.get(`${baseURL}?product_id=${productId}`);
  sleep(1);

  check(res1, {
    'has successful status': (r) => r.status === 200,
    'has a duration less than 75': (r) => r.timings.duration < 75
  });

  sleep(1);
  const res2 = http.get(`${baseURL}/${questionId}/answers`);

  check(res2, {
    'has successful status': (r) => r.status === 200,
    'has a duration less than 75': (r) => r.timings.duration < 75
  });

  sleep(1);
}
