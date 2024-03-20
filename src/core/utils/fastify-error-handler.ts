import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { GenerateResponse, loggers } from '.';

/**
 * Error handler for Fastify application.
 * @param error The FastifyError object.
 * @param request The FastifyRequest object.
 * @param reply The FastifyReply object.
 */
export const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
	const { code, message, name, stack, statusCode, validation, validationContext } = error;

	// Log the error
	loggers.exceptions.error({
		error: { code, message, name, stack, statusCode, validation, validationContext },
		'request-id': request.id,
	});

	// Handling specific error scenarios
	if (error instanceof fastify.errorCodes.FST_ERR_BAD_URL) {
		const { code: generatedCode, body } = GenerateResponse({
			responseInput: {
				status: false,
				error: { type: 'INVALID_INPUT', details: { message: 'URL Is Invalid' } },
			},
		});
		return reply.status(generatedCode).send(body);
	}

	// Default error response
	const { code: generatedCode, body } = GenerateResponse({
		responseInput: {
			status: false,
			error: { type: validation ? 'INVALID_INPUT' : 'INTERNAL_SERVER_ERROR', details: validation },
		},
	});
	reply.status(generatedCode).send(body);
};
