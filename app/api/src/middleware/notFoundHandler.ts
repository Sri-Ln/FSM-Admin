import { FastifyRequest, FastifyReply } from 'fastify';

export function notFoundHandler(_request: FastifyRequest, reply: FastifyReply) {
  return reply.status(404).send({ success: false, error: 'Not found' });
}
