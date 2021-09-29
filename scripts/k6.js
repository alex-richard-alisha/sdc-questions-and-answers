import http from 'k6/http';
import { sleep, check } from 'k6';
// import { Counter } from 'k6/metrics';

export const options = {
  stages: [
    { target: 1000, duration: '60s' }
  ]
};

export default function () {
  const baseURL = 'http://localhost:3000/qa/questions';
  const productId = Math.ceil(Math.random() * 20000);
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
