import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: { id: string; email: string | undefined; role: string };
  }
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.status(401).send({ success: false, error: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
  const { data: { user }, error } = await db.auth.getUser(token);

  if (error || !user) {
    return reply.status(401).send({ success: false, error: 'Invalid token' });
  }

  request.user = {
    id: user.id,
    email: user.email,
    role: (user.user_metadata?.role as string | undefined) ?? 'homeowner',
  };
}
