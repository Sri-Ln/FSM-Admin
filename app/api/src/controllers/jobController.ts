import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { listJobs, getJob, updateJobStatus } from '../models/jobModel.js';
import { success } from '../utils/response.js';

const UpdateStatusSchema = z.object({
  status: z.enum(['draft', 'pending', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled']),
});

export async function list(_req: FastifyRequest, reply: FastifyReply) {
  const data = await listJobs();
  return reply.send(success(data));
}

export async function getById(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const data = await getJob(id);
  return reply.send(success(data));
}

export async function updateStatus(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const { status } = UpdateStatusSchema.parse(req.body);
  const data = await updateJobStatus(id, status);
  return reply.send(success(data));
}
