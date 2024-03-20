import 'fastify';
import { FastifySchema, HTTPMethods, preHandlerAsyncHookHandler } from 'fastify';
import { FastifyContextConfig } from 'fastify/types/context';
import Redis from 'ioredis';
import { HandlerResult, configurations } from './utils';

declare module 'fastify' {
	interface FastifyReply {
		locals: Record<string, any>;
	}
	interface FastifyContextConfig {
		rateLimit?: rateLimiter.RouteRateLimitOptions | false;
	}
}

declare global {
	namespace rateLimiter {
		// Define rate limit options interface
		interface RateLimitOptions {
			limit: number; // Maximum number of requests allowed
			interval: number; // Time window in seconds
			redisClient: Redis;
		}

		interface RouteRateLimitOptions {
			limit: number; // Maximum number of requests allowed
			interval: number; // Time window in seconds
		}
	}

	interface RequestParts {
		body: any;
		headers: any;
		query: any;
		params:any;
	}

	/**
	 * Type representing different parts of a request.
	 */
	type HandlerParameter<Parts extends Partial<RequestParts>> = {
		body: Parts['body'];
		headers: Parts['headers'];
		query: Parts['query'];
		params: Parts['params'];

		locals: Record<string, any>;
		method: HTTPMethods;
		url: string;
	};

	/**
	 * Type representing application configurations.
	 */
	export type Configurations = typeof configurations;

	/**
	 * Type representing custom route options.
	 */
	export type CustomRouteOptions = {
		url: string;
		method: HTTPMethods | Array<HTTPMethods>;
		schema?: FastifySchema;
		preHandler?: Array<preHandlerAsyncHookHandler>;
		config?: FastifyContextConfig;
		handler: (request: HandlerParameter<RequestParts>) => Promise<HandlerResult>;
	};

	/**
	 * Type representing input data for building APIs.
	 */
	export type ApiBuilderInput = {
		configurations: Configurations;
		hooks: AvailableHooks;
		services: AvailableServices;
	};

	/**
	 * Type representing input data for registering APIs.
	 */
	export type RegisterApiInput = { prefix: string; routes: Array<CustomRouteOptions> };

	/**
	 * Type representing output data from building APIs.
	 */
	export type ApiBuilderOutput = Array<CustomRouteOptions>;

	/**
	 * Type representing input data for building hooks.
	 */
	export type HookBuilderInput = {
		configurations: Configurations;
		services: AvailableServices;
	};
}
