import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://example.com", () => {
    return HttpResponse.json();
  }),
];
