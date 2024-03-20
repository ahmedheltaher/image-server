import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastify, { FastifyInstance } from 'fastify';
import { OpenAPIV2 } from 'openapi-types';
import { ApiDefinitions, routes } from '../api';
import { GetHooks } from '../api/hooks';
import { RedisSingleton, SequelizeSingleton, seed } from '../database/server';
import { GetServices } from '../services';
import { rateLimitPlugin } from './extensions';
import { configurations, errorHandler, loggers, swaggerOptions, swaggerUIOptions } from './utils';
import { RoutesManager } from './utils/routes-manager';
import { definitions } from './validations';

/**
 * Options for configuring the Application.
 */
interface ApplicationOptions {
	host: string;
	port: number;
}

/**
 * The main Application class responsible for managing Fastify app and HTTP server.
 */
export class Application {
	/**
	 * The Fastify application instance.
	 * @private
	 */
	private readonly _instance: FastifyInstance;

	/**
	 * Creates an instance of the Application class.
	 */
	constructor() {
		this._instance = fastify({
			frameworkErrors: errorHandler,
		});
	}

	/**
	 * Initializes Swagger documentation.
	 */
	private async initSwagger() {
		await this._instance.register(fastifySwagger, swaggerOptions);
		await this._instance.register(fastifySwaggerUI, swaggerUIOptions);
	}

	/**
	 * Initializes the application by loading modules and registering routes.
	 * @param definitions - OpenAPI definitions.
	 */
	private async init(definitions: OpenAPIV2.DefinitionsObject) {
		if (configurations.getEnvironmentType() === 'DEVELOPMENT') await this.initSwagger();

		for (const definition in definitions) {
			this._instance.addSchema(definitions[definition]);
		}

		this._instance.setErrorHandler(errorHandler);
		const redisClient = await RedisSingleton.connect({ ...configurations.redis });

		this._instance.register(rateLimitPlugin, { limit: 50, interval: 5, redisClient });

		const services = await GetServices();
		const hooks = await GetHooks({ configurations, services });
		const builtRoutes = await RoutesManager.loadRoutes({ routes, hooks, services });

		for (const route of builtRoutes) {
			this._instance.route(route);
		}

		// Define a health check endpoint to verify server health.
		// This endpoint responds to HEAD and GET requests with a status 'ok'.
		this._instance.route({
			method: ['HEAD', 'GET'],
			url: '/health',
			handler: async (request, reply) => {
				reply.code(200).send({ status: 'ok' });
			},
		});

		//Listen to all routes to discourage brute force attacks and provide a warm welcome message.
		this._instance.all('*', async (request, reply) => {
			reply.code(200).send({ message: 'Welcome to Images Server API!' });
		});

		this._instance.addHook('onRequest', async (request, reply) => {
			// Executed when onRequest event is triggered
			// Setting reply.locals to an empty object
			reply.locals = {};
			loggers.requests.info({
				'request-id': request.id,
				'request-method': request.method,
				'request-url': request.url,
				'request-headers': request.headers,
				'request-body': request.body,
			});
		});
	}

	/**
	 * Initializes the application by syncing the database and registering routes.
	 */
	public async initialize(): Promise<void> {
		await SequelizeSingleton.getInstance().sync();
		await seed('./seed.json');
		await this.init({ ...definitions, ...ApiDefinitions });
	}

	/**
	 * Gets the Fastify application instance.
	 * @returns The Fastify application instance.
	 */
	public get instance(): FastifyInstance {
		return this._instance;
	}

	/**
	 * Starts listening on the specified host and port.
	 * @param options - Options for configuring the host and port.
	 * @param callback - An optional callback function to execute when the server is started.
	 * @returns The current Application instance.
	 */
	public listen(options: ApplicationOptions, callback?: (error: Error | null, address: string) => void): Application {
		const { host, port } = options;

		// Default callback logging the server address
		const defaultCallback = async (error: Error | null, address: string) => {
			if (error) {
				loggers.application.error(`Error starting the server: ${error}`);
				this.close();
				process.exit(1);
			}
			loggers.application.info(`Server started at: ${new Date().toISOString()} on ${address}`);
		};

		this._instance.listen({ port, host }, callback || defaultCallback);
		return this;
	}

	public close() {
		this._instance.close(async () => {
			await RedisSingleton.close();
			await SequelizeSingleton.close();
			loggers.application.info(`Server closed at: ${new Date().toISOString()}`);
		});
	}
}
