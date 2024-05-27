import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('http://example.com', () => {
    return HttpResponse.json();
  }),
];
