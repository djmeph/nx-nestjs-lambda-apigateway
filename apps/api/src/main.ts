import { bootstrap } from './app';

async function startLocal() {
  const fastifyInstance = await bootstrap();
  fastifyInstance.listen(Number(process.env.PORT) || 3333);
}

startLocal();