import { FastifyRequest } from 'fastify';

export type MyRequestQuery = FastifyRequest<{
  Querystring: { requestId: string };
}>;
