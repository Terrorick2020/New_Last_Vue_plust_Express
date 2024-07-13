interface RedisClient {
  on(event: 'connect', listener: () => void): this;
  on(event: 'ready', listener: () => void): this;
  on(event: 'error', listener: (err: Error) => void): this;
  on(event: 'end', listener: () => void): this;
  quit(): void;
}


import Redis from 'ioredis';


const client: RedisClient = new Redis({
  port: 6379,
  host: '185.218.0.150',
});

client.on('connect', () => {
  console.log('Client connected to redis...');
});

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...');
});

client.on('error', (err) => {
  console.error(err); // Используем console.error для логирования ошибок
});

client.on('end', () => {
  console.log('Client disconnected from redis');
});

// Обработка сигнала SIGINT для корректного завершения работы приложения
process.on('SIGINT', () => {
  client.quit();
  process.exit()
});

export default client;
