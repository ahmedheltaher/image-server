import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerUIOptions: FastifySwaggerUiOptions = {
	routePrefix: '/documentation',
	uiConfig: {
		docExpansion: 'list',
		deepLinking: true,
		validatorUrl: '127.0.0.1',
		defaultModelExpandDepth: 10,
	},
	theme: {
		title: 'images-server-api',
	},
};
