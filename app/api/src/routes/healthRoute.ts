import { FastifyPluginAsync } from 'fastify';
import { health } from '../controllers/healthController.js';

export const healthRoute: FastifyPluginAsync = async (app) => {
  app.get('/health', health);
};
