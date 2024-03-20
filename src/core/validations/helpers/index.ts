import { FastifySchema } from 'fastify';
import { ERROR_RESPONSE_MESSAGES, ErrorResponseMessages } from '../../utils';

export const EntitySchema = <T extends Record<string, FastifySchema>>(schemas: T) => schemas;

function ErrorResponse({ errorMessage }: { errorMessage: ErrorResponseMessages }) {
	return {
		type: 'object',
		properties: {
			success: { type: 'boolean', default: false },
			error: {
				type: 'object',
				properties: {
					type: { type: 'string', enum: ERROR_RESPONSE_MESSAGES, default: errorMessage },
					message: { type: 'string' },
					details: { type: 'object', additionalProperties: true },
				},
			},
		},
	};
}

function DataResponse(data: any) {
	return {
		type: 'object',
		properties: {
			success: { type: 'boolean', default: true },
			data: { type: 'object', properties: data },
		},
	};
}

type HTTP_ERRORS = '401' | '500' | '404' | '409';
const defaultErrorResults: Record<HTTP_ERRORS, any> = {
	'500': ErrorResponse({ errorMessage: 'INTERNAL_SERVER_ERROR' }),
	'401': ErrorResponse({ errorMessage: 'UNAUTHENTICATED' }),
	'404': ErrorResponse({ errorMessage: 'ENTITY_NOT_FOUND' }),
	'409': ErrorResponse({ errorMessage: 'CONFLICT' }),
};

export function GetResponses({ successResponse, errors = [] }: { successResponse: any; errors?: Array<HTTP_ERRORS> }) {
	const result: Record<string, any> = { '200': DataResponse(successResponse) };
	for (const errorCode of errors.concat('500')) result[errorCode] = defaultErrorResults[errorCode];
	return result;
}
