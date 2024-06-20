import { FastifyReply } from 'fastify';
import { MyRequestQuery } from '../types';
import { requestState } from '../../data/TimerMap';

export const delayTimer = async (
  request: MyRequestQuery,
  reply: FastifyReply
) => {
  const requestId = request.query.requestId;
  if (!requestId) return reply.send({ error: 'missing requestId' });
  if (requestState.has(requestId)) {
    const existingState = requestState.get(requestId);
    if (existingState) existingState.prepResolve('remove');
  }
  const promise = new Promise<void>((resolve) => {
    const prepResolve = (command: string) => {
      resolve(clearTimeout(timeout));
      requestState.delete(requestId);
      if (command == 'remove')
        reply.send({ message: 'your previous request has been cancled' });
    };
    const timeout = setTimeout(prepResolve, 5000);
    requestState.set(requestId, { prepResolve });
  });
  await promise;
};
