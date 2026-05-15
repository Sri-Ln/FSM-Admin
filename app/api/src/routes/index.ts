import { FastifyInstance } from 'fastify';
import { healthRoute } from './healthRoute.js';
import { authRoute } from './authRoute.js';
import { jobRoute } from './jobRoute.js';
import { workOrderRoute } from './workOrderRoute.js';
import { contractorRoute } from './contractorRoute.js';

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthRoute);
  await app.register(authRoute, { prefix: '/auth' });
  await app.register(jobRoute, { prefix: '/jobs' });
  await app.register(workOrderRoute, { prefix: '/work-orders' });
  await app.register(contractorRoute, { prefix: '/contractors' });
}
