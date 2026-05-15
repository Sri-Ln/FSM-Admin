import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { listContractors, getContractor, updateContractorStatus } from '../models/contractorModel.js';
import { success } from '../utils/response.js';

const UpdateStatusSchema = z.object({
  status: z.enum(['approved', 'suspended']),
});

export async function list(_req: FastifyRequest, reply: FastifyReply) {
  const data = await listContractors();
  return reply.send(success(data));
}

export async function getById(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const data = await getContractor(id);
  return reply.send(success(data));
}

export async function updateStatus(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const { status } = UpdateStatusSchema.parse(req.body);
  const data = await updateContractorStatus(id, status);
  return reply.send(success(data));
}
