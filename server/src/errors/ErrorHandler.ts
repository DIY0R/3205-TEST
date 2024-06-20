import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const ErrorHandler = async (
  err: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (err.validation) {
    reply.code(403);
    return err.message;
  }
  request.log.error({ err });
  reply.code(err.statusCode || 500);
  return "I'm sorry, there was an error processing your request.";
};

export const NotFoundHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.code(404);
  return "I couldn't find what you were looking for.";
};
