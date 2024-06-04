import { DefaultBodyType } from 'msw';

export const Success = (body?: DefaultBodyType) =>
  new Response(body ? JSON.stringify(body) : null, {
    status: 201,
  });

export const NotFoundError = new Response(null, {
  status: 404,
});
