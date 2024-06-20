import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import { delayTimer } from './hooks/DelayTimer';
import { LoginSchema, LoginSchemaType } from './schema/login.schema';
const AuthModule = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.addHook('onRequest', delayTimer);

  fastify.post(
    '/login',
    LoginSchema,
    async (
      request: FastifyRequest<{ Body: LoginSchemaType }>,
      reply: FastifyReply
    ) => {
      try {
        const { email, number } = request.body;
        const users = fastify.data.filter(
          (user) =>
            user.email == email && (number ? user.number === number : true)
        );

        if (!users.length)
          return reply.status(404).send({ error: 'User not found' });

        return reply.status(200).send({ users });
      } catch (error) {
        return reply.status(500).send({ error: 'Internal Server Error' });
      }
    }
  );
  done();
};

export default AuthModule;
