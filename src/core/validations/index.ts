import { OpenAPIV2 } from 'openapi-types';

const GlobalDefinitions: OpenAPIV2.DefinitionsObject = {
	PaginatedQuery: {
		$id: '$PaginatedQuery',
		type: 'object',
		properties: {
			limit: { type: 'number', minimum: -1, default: -1 },
			page: { type: 'number', minimum: 1, default: 1 },
		},
		additionalProperties: false,
	},
};

export const definitions: OpenAPIV2.DefinitionsObject = {
	...GlobalDefinitions,
};
