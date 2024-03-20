export interface IDates {
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

interface Attributes {
	[key: string]: any;
}

type TToJSON<T extends Attributes> = {
	modelInstance: T;
	keysToDelete?: Array<string>;
	keyAliases?: {
		[key: string]: string;
	};
};

export class JSONSerializer<T extends Attributes> {
	toJSON({ modelInstance, keysToDelete, keyAliases }: TToJSON<T>): T {
		const values = { ...modelInstance };

		// Delete keys to be deleted
		if (keysToDelete && keysToDelete.length > 0) {
			keysToDelete.forEach((key) => {
				delete values[key];
			});
		}

		// Rename keys if aliases are provided
		if (keyAliases) {
			for (const [originalKey, alias] of Object.entries(keyAliases)) {
				if (values.hasOwnProperty(originalKey)) {
					(values as Record<string, any>)[alias] = values[originalKey];
					delete values[originalKey];
				}
			}
		}

		return values;
	}
}
