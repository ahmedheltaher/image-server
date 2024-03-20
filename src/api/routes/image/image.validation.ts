import { EntitySchema, GetResponses } from '../../../core/validations/helpers';

const ImageProperties = {
	title: { type: 'string', minLength: 3, maxLength: 100 },
	author: { type: 'string', minLength: 3, maxLength: 100 },
	ISBN: { type: 'string', minLength: 3, maxLength: 100 },
	availableQuantity: { type: 'number', minimum: 0, default: 1 },
	shelfLocation: { type: 'string', minLength: 3, maxLength: 100 },
};

export const ImagesDefinitions = {
	Image: {
		$id: '$Image',
		type: 'object',
		properties: { id: { type: 'string', format: 'uuid' }, ...ImageProperties },
		additionalProperties: false,
	},
	ImageCreate: {
		$id: '$ImageCreate',
		type: 'object',
		properties: ImageProperties,
		required: ['title', 'author', 'ISBN', 'availableQuantity', 'shelfLocation'],
		additionalProperties: false,
	},
	ImageUpdate: {
		$id: '$ImageUpdate',
		type: 'object',
		properties: ImageProperties,
		additionalProperties: false,
	},
	ImageIdInput: {
		$id: '$ImageIdInput',
		type: 'object',
		properties: { ImageId: { type: 'string', format: 'uuid' } },
		required: ['ImageId'],
		additionalProperties: false,
	},
	ImageISBNInput: {
		$id: '$ImageISBNInput',
		type: 'object',
		properties: { ISBN: { type: 'string' } },
		required: ['ISBN'],
		additionalProperties: false,
	},
	ImageTitleInput: {
		$id: '$ImageTitleInput',
		type: 'object',
		properties: { title: { type: 'string' } },
		required: ['title'],
		additionalProperties: false,
	},
	ImageAuthorInput: {
		$id: '$ImageAuthorInput',
		type: 'object',
		properties: { author: { type: 'string' } },
		required: ['author'],
		additionalProperties: false,
	},
};

export const ImageSchemas = EntitySchema({
	GetAllImages: {
		summary: 'Retrieve all Images with optional pagination',
		description:
			'This endpoint retrieves a list of all Images available in the library system. Pagination support is provided for managing large collections of Images.',
		querystring: { $ref: '$PaginatedQuery' },
		tags: ['Image'],
		security: [{ apiKey: [] }],
		response: GetResponses({
			successResponse: { Images: { type: 'array', items: { $ref: '$Image' } } },
			errors: ['401'],
		}),
	},
	GetImage: {
		summary: 'Retrieve Image details by ID',
		description:
			'This endpoint retrieves detailed information about a specific Image in the library system based on its unique identifier.',
		params: { $ref: '$ImageIdInput' },
		tags: ['Image'],
		security: [{ apiKey: [] }],
		response: GetResponses({ successResponse: { Image: { $ref: '$Image' } }, errors: ['401'] }),
	},
	GetImageByISBN: {
		summary: 'Retrieve Image details by ISBN',
		description:
			'This endpoint fetches detailed information about a Image in the library system using its International Standard Image Number (ISBN).',
		params: { $ref: '$ImageISBNInput' },
		tags: ['Image'],
		security: [{ apiKey: [] }],
		response: GetResponses({ successResponse: { Image: { $ref: '$Image' } }, errors: ['401'] }),
	},
	GetImageByTitle: {
		summary: 'Retrieve Image details by title',
		description:
			'This endpoint retrieves detailed information about Images in the library system by matching or similar titles.',
		params: { $ref: '$ImageTitleInput' },
		tags: ['Image'],
		security: [{ apiKey: [] }],
		response: GetResponses({
			successResponse: { Images: { type: 'array', items: { $ref: '$Image' } } },
			errors: ['401'],
		}),
	},
	GetImageByAuthor: {
		summary: 'Retrieve Image details by author',
		description:
			'This endpoint retrieves detailed information about Images in the library system by matching or similar author names.',
		params: { $ref: '$ImageAuthorInput' },
		tags: ['Image'],
		security: [{ apiKey: [] }],
		response: GetResponses({
			successResponse: { Images: { type: 'array', items: { $ref: '$Image' } } },
			errors: ['401'],
		}),
	},
	AddImage: {
		summary: 'Add a new Image to the library',
		description:
			'`**Only For Librarian**`  This endpoint allows librarians to add a new Image to the library system, providing all necessary details including title, author, ISBN, available quantity, and shelf location.',
		tags: ['Image'],
		body: { $ref: '$ImageCreate' },
		security: [{ apiKey: [] }],
		response: GetResponses({ successResponse: { Image: { $ref: '$Image' } }, errors: ['401'] }),
	},
	UpdateImage: {
		summary: 'Update Image details by ID',
		description:
			'`**Only For Librarian**`  This endpoint enables librarians to update the details of a Image in the library system based on its unique identifier.',
		tags: ['Image'],
		params: { $ref: '$ImageIdInput' },
		body: { $ref: '$ImageUpdate' },
		security: [{ apiKey: [] }],
		response: GetResponses({ successResponse: { Image: { $ref: '$Image' } }, errors: ['401'] }),
	},
	DeleteImage: {
		summary: 'Delete a Image by ID',
		description:
			'`**Only For Librarian**` This endpoint allows librarians to permanently remove a Image from the library system based on its unique identifier.',
		params: { $ref: '$ImageIdInput' },
		tags: ['Image'],
		security: [{ apiKey: [] }],
		response: GetResponses({ successResponse: { message: { type: 'string' } }, errors: ['401'] }),
	},
});
