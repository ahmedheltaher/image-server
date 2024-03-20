import { ImageApiBuilder, ImagesDefinitions } from './image';

export const routes = [
	{ prefix: '/Images', buildHandler: ImageApiBuilder, version: 'v1' }
];

export const ApiDefinitions = {
	...ImagesDefinitions,
};
