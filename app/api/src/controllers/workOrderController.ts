import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { listWorkOrders, getWorkOrder, updateWorkOrderStatus } from '../models/workOrderModel.js';
import { success } from '../utils/response.js';

const UpdateStatusSchema = z.object({
  status: z.enum(['pending', 'scheduled', 'in_progress', 'completed', 'cancelled']),
});

export async function list(_req: FastifyRequest, reply: FastifyReply) {
  const data = await listWorkOrders();
  return reply.send(success(data));
}

export async function getById(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const data = await getWorkOrder(id);
  return reply.send(success(data));
}

export async function updateStatus(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const { status } = UpdateStatusSchema.parse(req.body);
  const data = await updateWorkOrderStatus(id, status);
  return reply.send(success(data));
}
