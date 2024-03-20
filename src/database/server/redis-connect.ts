import Redis, { RedisOptions } from 'ioredis';
import { loggers } from '../../core';

/**
 * Singleton class to manage a single Redis connection.
 */
export class RedisSingleton {
	private static redisClient: Redis | null = null;

	private constructor() {}

	/**
	 * Establishes a connection to Redis server if not already connected.
	 * @param redisConfig Redis connection options.
	 * @returns Redis client instance.
	 */
	public static async connect(redisConfig: RedisOptions): Promise<Redis> {
		if (RedisSingleton.redisClient !== null) {
			return RedisSingleton.redisClient;
		}

		loggers.redis.info(`Trying to create a Redis connection to ${JSON.stringify(redisConfig)}`);

		const client = new Redis(redisConfig);

		client.on('error', (error) => {
			loggers.redis.error(`Redis connection error: ${error}`);
		});

		client.on('end', () => {
			loggers.redis.info('Redis connection ended.');
			RedisSingleton.redisClient = null;
		});

		const response = await client.ping();

		if (response === 'PONG') {
			loggers.redis.info('Redis connection successful.');
		} else {
			loggers.redis.error('Failed to establish Redis connection.');
			throw new Error('Failed to establish Redis connection.');
		}

		RedisSingleton.redisClient = client;

		return client;
	}

	/**
	 * Closes the connection to Redis server if connected.
	 * @returns A promise that resolves once the connection is closed.
	 * */
	public static async close(): Promise<void> {
		if (RedisSingleton.redisClient !== null) {
			await RedisSingleton.redisClient.quit();
		}
	}
}
