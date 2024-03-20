import { TImageCreate, TImageUpdate } from '../../../services';
import { ImageSchemas } from './image.validation';

type TImageIDQuery = { ImageId: string };

export async function ImageApiBuilder({ services, hooks }: ApiBuilderInput): Promise<ApiBuilderOutput> {
	const { imageService } = services;
	return [
		{
			url: '/',
			method: 'GET',
			schema: ImageSchemas.GetAllImages,
			preHandler: [hooks.tokenRequired],
			handler: async ({ query }: HandlerParameter<{ query: PaginatedQuery }>) => {
				const { limit = -1, page = 1 } = query;
				const offset = (page - 1) * limit;
				const Images = await imageService.getAll({ limit, offset });
				return { status: true, data: { Images } };
			},
		},
		{
			url: '/:ImageId',
			method: 'GET',
			schema: ImageSchemas.GetImage,
			preHandler: [hooks.tokenRequired],
			handler: async ({ params }: HandlerParameter<{ params: TImageIDQuery }>) => {
				const { ImageId } = params;
				const Image = await imageService.getById(ImageId);
				if (!Image) {
					return { status: false, error: { type: 'ENTITY_NOT_FOUND' } };
				}
				return { status: true, data: { Image } };
			},
		},

		{
			url: '/',
			method: 'POST',
			schema: ImageSchemas.AddImage,
			preHandler: [hooks.tokenRequired],
			handler: async ({ body }: HandlerParameter<{ body: TImageCreate }>) => {
				try {
					const Image = await imageService.add(body);
					return { status: true, data: { Image } };
				} catch (error) {
					return {
						status: false,
						error: {
							type: 'CONFLICT',
							details: {
								message: 'Looks Like there is already a Image with the same ISBN',
							},
						},
					};
				}
			},
		},
		{
			url: '/:ImageId',
			method: 'PUT',
			schema: ImageSchemas.UpdateImage,
			preHandler: [hooks.tokenRequired],
			handler: async ({ params, body }: HandlerParameter<{ params: TImageIDQuery; body: TImageUpdate }>) => {
				const { ImageId } = params;

				const [affectedCount, affectedRows] = await imageService.update(ImageId, body);
				if (!affectedCount) {
					return { status: false, error: { type: 'ENTITY_NOT_FOUND' } };
				}
				return { status: true, data: { Image: affectedRows[0] } };
			},
		},
		{
			url: '/:ImageId',
			method: 'DELETE',
			schema: ImageSchemas.DeleteImage,
			preHandler: [hooks.tokenRequired],
			handler: async ({ params }: HandlerParameter<{ params: TImageIDQuery }>) => {
				const { ImageId } = params;
				const isDeleted = await imageService.delete(ImageId);
				if (!isDeleted) {
					return { status: false, error: { type: 'ENTITY_NOT_FOUND' } };
				}
				return { status: true, data: {} };
			},
		},
	];
}
