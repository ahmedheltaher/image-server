import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
	swagger: {
		info: {
			title: '',
			description: 'This API provides endpoints for managing a images upload and download system.',
			version: '0.1.0',
		},
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
		tags: [{ name: 'Image', description: 'Endpoints for managing Images' }],
		securityDefinitions: {
			apiKey: { type: 'apiKey', name: 'authentication', in: 'header' },
		},
	},
};
