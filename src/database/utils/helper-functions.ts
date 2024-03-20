import { v4 as UUIDv4 } from 'uuid';

/**
 * Returns Array of objects which generated from enum or object of objects
 *
 * @param {Record<string, any>} object The enum or object of object we want to convert.
 * @return {Array<Record<string, any>>} array of objects
 */
export function ToArrayOfObjects(object: Record<string, any>): Array<Record<string, any>> {
	return Object.keys(object).map((key) => ({ [key]: object[key] }));
}

/**
 * Returns Array of string (values of the keys) which generated from enum or object;
 *
 * @param {Record<string, any>} object The enum or object of object we want to convert.
 * @return {Array<string>} array of objects
 */
export function ToArrayOfValues(object: Record<string, any>): string[] {
	return Object.keys(object).map((key) => object[key]);
}

/**
 * Groups array of objects by a key;
 *
 * @param { Record<string, any>} arrayOfObjects the array of objects we want to group.
 * @param {string} key The key we want to group by.
 * @return { Record<string, any> } the object of grouped objects
 */
export function groupObjectsBy(arrayOfObjects: Record<string, any>, key: string): Record<string, any> {
	return arrayOfObjects.reduce((objects: Record<string, any>, item: any) => {
		(objects[item[key]] = objects[item[key]] || []).push(item);
		return objects;
	}, {});
}

/**
 * Filters array of objects from empty and null value;
 *
 * @param { Array<any>} arrayOfObjects the array of objects we want to filter.
 * @return { Array<any> } the filtered array
 */
export function cleanArray(arrayOfObjects: Array<any>): any[] {
	Object.entries(arrayOfObjects).forEach(([_, value]: any) => {
		for (const key in value) {
			if (value[key] === null || value[key] === undefined || value[key].length <= 0) {
				delete value[key];
			}
		}
	});
	return arrayOfObjects.filter(
		(element: any) => typeof element !== 'object' || Array.isArray(element) || Object.keys(element).length > 0
	);
}

/**
 * Split String and return array of splitted strings only the unique ones;
 *
 * @param { string} str the string we want to split.
 * @param { string} delimiter the delimiter we split by be default it's set to ",".
 * @return { Array<string> } the splitted array
 */
export function splitString(str: string, delimiter: string = ','): Array<string> {
	return [...new Set(str.split(delimiter))];
}

/**
 * Return array only the unique objects in it;
 *
 * @param { Array<any>} arr the Array we want to filter.
 * @param { string} key key we want to check by.
 * @return { Array<string> } the filtered array array
 */
export function removeDuplicateObjectsForArray(arr: Array<any>, key: string): Array<any> {
	return [...new Map(arr.map((item) => [item[key], item])).values()];
}

/**
 * Generates a UUID (V4).
 *
 * @returns {string} The generated UUID.
 */
export function generateUUID(): string {
	return UUIDv4();
}
