import { TokenRequiredBuilder } from './token-required.hook';

export async function GetHooks(input: HookBuilderInput) {
	return {
		tokenRequired: await TokenRequiredBuilder(input),
	};
}
