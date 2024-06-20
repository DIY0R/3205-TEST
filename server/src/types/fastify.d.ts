import 'fastify';
import { LoginSchemaType } from '../auth/schema/login.schema';

declare module 'fastify' {
  interface FastifyInstance {
    data: LoginSchemaType[];
  }
}
