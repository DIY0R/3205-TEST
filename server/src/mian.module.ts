import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import AuthModule from './auth/auth';
import { ErrorHandler } from './errors/ErrorHandler';
import { getData } from './auth/decorators/GetData';
import path from 'path';

const MainModule = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.register(getData, {
    filePath: path.join(__dirname, './data/data.json'),
  });
  fastify.setErrorHandler(ErrorHandler);
  fastify.register(AuthModule, { prefix: '/auth' });

  done();
};

export default MainModule;
