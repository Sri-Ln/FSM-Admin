import { FastifyPluginAsync } from 'fastify';
import { authenticate } from '../middleware/authenticate.js';
import { getMe } from '../controllers/authController.js';

export const authRoute: FastifyPluginAsync = async (app) => {
  app.get('/me', { preHandler: [authenticate] }, getMe);
};
