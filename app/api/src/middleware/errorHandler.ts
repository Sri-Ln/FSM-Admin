import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export function errorHandler(
  error: FastifyError | ZodError | (Error & { statusCode?: number }),
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({ success: false, error: 'Validation error', code: 'VALIDATION_ERROR' });
  }

  const statusCode = (error as FastifyError).statusCode ?? (error as Error & { statusCode?: number }).statusCode ?? 500;
  return reply.status(statusCode).send({
    success: false,
    error: error.message,
    code: (error as FastifyError).code,
  });
}
