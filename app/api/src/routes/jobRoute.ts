import { FastifyPluginAsync } from 'fastify';
import { list, getById, updateStatus } from '../controllers/jobController.js';

export const jobRoute: FastifyPluginAsync = async (app) => {
  app.get('/', list);
  app.get('/:id', getById);
  app.patch('/:id/status', updateStatus);
};
