import { FastifyReply, FastifyRequest, HTTPMethods } from 'fastify';
import { GenerateResponse, GenerateResponseResult, configurations, stripSlashes } from '.';

/**
 * Type representing a route handler function.
 */
type RouteHandler = (_: ApiBuilderInput) => Promise<ApiBuilderOutput>;

/**
 * Type representing a route configuration.
 */
type RouteConfig = {
	prefix: string;
	buildHandler: RouteHandler;
	version: string;
};

/**
 * Type representing input data for loading routes.
 */
type LoadRoutesInput = {
	routes: RouteConfig[];
	hooks: AvailableHooks;
	services: AvailableServices;
};

/**
 * Utility class to manage loading routes.
 */
export class RoutesManager {
	/**
	 * Load routes based on provided configurations.
	 * @param input LoadRoutesInput object containing routes, hooks, and services.
	 * @returns Array of built routes.
	 */
	static async loadRoutes({ routes, hooks, services }: LoadRoutesInput) {
		const builtRoutes = [];

		for (const { prefix, buildHandler, version } of routes) {
			const fullPrefix = `/${version}/${stripSlashes(prefix)}`;
			const rowRoutes = await buildHandler({ configurations, hooks, services });

			for (const route of rowRoutes) {
				const url = this.buildUrl(configurations.api.prefix, fullPrefix, route.url);

				const handler = this.createHandler(route);

				builtRoutes.push({ ...route, url, handler });
			}
		}

		return builtRoutes;
	}

	/**
	 * Helper function to construct URL.
	 * @param parts Parts of URL to concatenate.
	 * @returns Constructed URL string.
	 */
	private static buildUrl(...parts: string[]) {
		return `/${stripSlashes(parts.join('/'))}`;
	}

	/**
	 * Create route handler function.
	 * @param route Route configuration.
	 * @returns Constructed route handler function.
	 */
	private static createHandler(route: any) {
		return async (request: FastifyRequest, reply: FastifyReply) => {
			const result = await route.handler({
				body: request.body,
				headers: request.headers,
				query: request.query,
				params: request.params,
				method: request.method as HTTPMethods,
				url: request.url,
				locals: reply.locals,
			});

			const response = GenerateResponse({ responseInput: result });
			return this.populateResponse(response, reply);
		};
	}

	/**
	 * Populate response with headers and body.
	 * @param response GenerateResponseResult object.
	 * @param reply FastifyReply object.
	 * @returns FastifyReply object with populated response.
	 */
	private static populateResponse(response: GenerateResponseResult, reply: FastifyReply) {
		const { code, body, headers } = response;

		Object.entries(headers).forEach(([headerName, headerValue]) => {
			reply.header(headerName, headerValue);
		});

		if (reply.locals.headers) {
			Object.entries(reply.locals.headers).forEach(([headerName, headerValue]) => {
				reply.header(headerName, headerValue);
			});
		}

		return reply.code(code).send(body);
	}
}
