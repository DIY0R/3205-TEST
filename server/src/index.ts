import fastify, { FastifyInstance } from 'fastify';
import MainModule from './mian.module';
import { NotFoundHandler } from './errors/ErrorHandler';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import cors from '@fastify/cors';

const server: FastifyInstance =
  fastify().withTypeProvider<TypeBoxTypeProvider>();
server.register(cors, { origin: true });
server.register(MainModule, { prefix: '/api' });
server.get('/notfound', async (request, reply) => {
  reply.callNotFound();
});
server.setNotFoundHandler(NotFoundHandler);
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
