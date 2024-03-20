import { Image, ImageInput } from '../models';
import { BaseRepository } from './base';

export class ImageRepository extends BaseRepository<Image, ImageInput> {
	constructor() {
		super(Image);
	}
}
