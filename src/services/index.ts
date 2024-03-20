import { ImageRepository } from '../database';
import { ImageService } from './images.service';

export async function GetServices() {
	const imageRepository = new ImageRepository();

	const imageService = new ImageService(imageRepository);

	return { imageService, } as const;
}

export { TImageCreate, TImageUpdate } from './images.service';

