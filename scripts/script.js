import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

// import GetQuestions from '../__tests__/data/GetQuestions';

// A simple counter for http requests

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { target: 5, duration: '10s' },
    // { target: 15, duration: '10s' },
    // { target: 0, duration: '10s' },
  ],
  thresholds: {
    requests: ['count < 100'],
  },
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
