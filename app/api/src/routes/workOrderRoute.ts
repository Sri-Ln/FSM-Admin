import { FastifyPluginAsync } from 'fastify';
import { list, getById, updateStatus } from '../controllers/workOrderController.js';

export const workOrderRoute: FastifyPluginAsync = async (app) => {
  app.get('/', list);
  app.get('/:id', getById);
  app.patch('/:id/status', updateStatus);
};
