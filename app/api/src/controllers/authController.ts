import { FastifyRequest, FastifyReply } from 'fastify';
import { success } from '../utils/response.js';

export async function getMe(req: FastifyRequest, reply: FastifyReply) {
  return reply.send(success(req.user));
}
