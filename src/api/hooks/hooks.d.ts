import { GetHooks } from '.';

declare global {
	export type AvailableHooks = Awaited<ReturnType<typeof GetHooks>>;
}
