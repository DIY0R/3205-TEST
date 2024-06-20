import fp from 'fastify-plugin';
import fs from 'fs';
import { FastifyInstance } from 'fastify';

interface Options {
  filePath: string;
}
const getData = fp(
  (fastify: FastifyInstance, options: Options, done: (err?: Error) => void) => {
    const rawData = fs.readFileSync(options.filePath);
    const data = JSON.parse(rawData.toString());

    fastify.decorate('data', data);
    done();
  }
);

export { getData };
