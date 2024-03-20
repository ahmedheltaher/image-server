/**
 * Removes leading and trailing slashes from a string, as well as condenses multiple slashes to a single slash.
 *
 * @param input - The string to strip slashes from.
 * @returns The input string with leading/trailing and condensed slashes removed.
 */
export function stripSlashes(input: string): string {
	return input.replace(/^\/+|\/+$/g, '').replace(/\/\/+/g, '/');
}
