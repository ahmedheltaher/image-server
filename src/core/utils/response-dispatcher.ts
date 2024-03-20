/**
 * List of error response messages.
 */
export const ERROR_RESPONSE_MESSAGES = [
	'INTERNAL_SERVER_ERROR',
	'UNAUTHENTICATED',
	'INVALID_INPUT',
	'ENTITY_NOT_FOUND',
	'CONFLICT',
	'UNAUTHORIZED',
] as const;

/**
 * Type representing the possible error response messages.
 */
export type ErrorResponseMessages = (typeof ERROR_RESPONSE_MESSAGES)[number];

/**
 * Type representing the result of a handler.
 */
export type HandlerResult =
	| {
			status: true;
			data: Record<string, any>;
			file?: any;
			headers?: Record<string, any>;
	  }
	| {
			status: false;
			error: {
				type: ErrorResponseMessages;
				details?: Record<string, any>;
				statusCode?: number;
			};
			headers?: Record<string, any>;
	  };

/**
 * Type representing the details of a response.
 */
type ResponseDetails = {
	message: string;
	statusCode: number;
};

/**
 * Object containing error messages and their details.
 */
export const errorMessages: Record<ErrorResponseMessages, ResponseDetails> = {
	INTERNAL_SERVER_ERROR: {
		message: 'Internal Server Error',
		statusCode: 500,
	},
	UNAUTHENTICATED: {
		message: 'You are not Authenticated',
		statusCode: 401,
	},
	INVALID_INPUT: {
		message: 'The Request Contains Invalid Data',
		statusCode: 400,
	},
	ENTITY_NOT_FOUND: {
		message: 'The Entity You Are Looking for is Not Found',
		statusCode: 404,
	},
	CONFLICT: {
		message: 'Conflict Happened while Processing the Request',
		statusCode: 409,
	},
	UNAUTHORIZED: {
		message: 'You are not Unauthorized to do this Action',
		statusCode: 403,
	},
};

/**
 * Input for generating response.
 */
export type GenerateResponseInput = {
	responseInput: HandlerResult;
};

/**
 * Result of generating response.
 */
export type GenerateResponseResult = {
	code: number;
	body: Record<string, any>;
	headers: Record<string, any>;
};

/**
 * Generate response based on handler result.
 * @param responseInput Input data for generating response.
 * @returns Generated response.
 */
export function GenerateResponse({ responseInput }: GenerateResponseInput): GenerateResponseResult {
	const { status, headers = {} } = responseInput;

	if (status) {
		if (responseInput.file) return { code: 200, body: responseInput.file, headers };
		return { code: 200, body: { status, data: responseInput.data }, headers };
	}

	const { error } = responseInput;
	const { message, statusCode } = errorMessages[error.type];

	return {
		code: error.statusCode ? error.statusCode : statusCode,
		body: { status, error: { message, details: error.details || {} } },
		headers,
	};
}
