import { GetServices } from '.';

declare global {
	export type AvailableServices = Awaited<ReturnType<typeof GetServices>>;

	interface PaginatedServiceMethod {
		limit?: number;
		offset?: number;
	}
}
