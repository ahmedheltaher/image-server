import { ImageInput, ImageRepository } from '../database';


export type TImageCreate = ImageInput;
export type TImageUpdate = Partial<ImageInput>;

export class ImageService {
	constructor(
		private readonly imageRepository: ImageRepository,

		) {}

	async add(createData: TImageCreate) {
		return await this.imageRepository.create(createData);
	}

	async getAll({ limit, offset }: PaginatedServiceMethod = { limit: -1, offset: 0 }) {
		const options: Record<string, any> = {};
		if (offset) options.offset = offset;
		if (limit && limit > -1) options.limit = limit;

		return await this.imageRepository.findAll(options);
	}

	async getById(id: string) {
		return await this.imageRepository.findOne({ where: { id } });
	}

	async update(id: string, updateData: TImageUpdate) {
		return await this.imageRepository.update(updateData, { where: { id } });
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.imageRepository.delete({ where: { id } });
		return !!result;
	}
}
