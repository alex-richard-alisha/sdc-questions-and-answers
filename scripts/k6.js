import http from 'k6/http';
import { sleep, check } from 'k6';
// import { Counter } from 'k6/metrics';

// import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

// import GetQuestions from '../__tests__/data/GetQuestions';

// A simple counter for http requests

// export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { target: 5, duration: '10s' }
    // { target: 15, duration: '10s' },
    // { target: 0, duration: '10s' },
  ]
  // thresholds: {
  //   requests: ['count < 100'],
  // },
};

export default function () {
  const baseURL = 'http://127.0.0.1:3000/qa/questions';
  const productId = Math.floor(Math.random() * 20);
  const questionId = Math.floor(Math.random() * 20);
  const res1 = http.get(`${baseURL}?product_id=${productId}`);
  sleep(1);

  check(res1, {
    'has successful status': (r) => r.status === 200,
    'has a duration less than 1000': (r) => r.timings.duration < 1000
  });

  sleep(1);
  const res2 = http.get(`${baseURL}/${questionId}/answers`);

  check(res2, {
    'has successful status': (r) => r.status === 200,
    'has a duration less than 1000': (r) => r.timings.duration < 1000
  });

  sleep(1);
}
