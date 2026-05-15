import { buildApp } from './app.js';
import { config } from './config/env.js';

async function start() {
  const app = await buildApp();
  await app.listen({ port: config.PORT, host: config.HOST });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
