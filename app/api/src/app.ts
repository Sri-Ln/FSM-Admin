import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './config/env.js';
import { getLoggerConfig } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { registerRoutes } from './routes/index.js';

export async function buildApp() {
  const app = Fastify({ logger: getLoggerConfig() });

  await app.register(cors, {
    origin: config.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  await registerRoutes(app);

  return app;
}
