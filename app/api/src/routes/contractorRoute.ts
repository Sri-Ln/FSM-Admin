import { FastifyPluginAsync } from 'fastify';
import { list, getById, updateStatus } from '../controllers/contractorController.js';

export const contractorRoute: FastifyPluginAsync = async (app) => {
  app.get('/', list);
  app.get('/:id', getById);
  app.patch('/:id/status', updateStatus);
};
