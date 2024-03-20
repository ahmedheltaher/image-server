import { AbstractDataTypeConstructor, DataTypes } from 'sequelize';

/**
 * Interface representing the configuration for creating a single field in a database table.
 */
interface SingleFieldFactoryInterface<T = any> {
	type: AbstractDataTypeConstructor;
	allowNull: boolean;
	unique?: boolean;
	primaryKey?: boolean;
	foreignKey?: boolean;
	autoIncrement?: boolean;
	references?: ReferencesType;
	defaultValue?: (() => T) | T;
}

/**
 * Type representing references to other models in a database table.
 */
type ReferencesType = {
	model: string;
	key: string;
};

/**
 * Builder class for creating database table fields.
 */
export class FieldFactoryBuilder<T = any> {
	private field: SingleFieldFactoryInterface<T> = {
		type: DataTypes.STRING,
		allowNull: false,
	};

	private constructor(type: AbstractDataTypeConstructor) {
		this.field.type = type;
	}

	/**
	 * Creates a new FieldFactoryBuilder instance with the specified data type.
	 * @param type - The data type for the field.
	 * @returns A new FieldFactoryBuilder instance.
	 */
	static create<T>(type: AbstractDataTypeConstructor): FieldFactoryBuilder<T> {
		return new FieldFactoryBuilder<T>(type);
	}

	/**
	 * Sets the default value for the field.
	 * @param defaultValueCallback - Callback function or value to set as the default value.
	 * @returns The FieldFactoryBuilder instance.
	 */
	DefaultValue(defaultValueCallback: (() => T) | T): this {
		this.field.defaultValue = defaultValueCallback;
		return this;
	}

	/**
	 * Sets the field as a primary key.
	 * @param options - Options for the primary key (e.g., autoIncrement).
	 * @returns The FieldFactoryBuilder instance.
	 */
	PrimaryKey({ autoIncrement }: { autoIncrement?: boolean } = {}): this {
		this.field.primaryKey = true;
		if (autoIncrement) this.field.autoIncrement = autoIncrement;
		return this;
	}

	/**
	 * Sets the field to allow null values.
	 * @returns The FieldFactoryBuilder instance.
	 */
	AllowNull(): this {
		this.field.allowNull = true;
		return this;
	}

	/**
	 * Sets the field to not allow null values.
	 * @returns The FieldFactoryBuilder instance.
	 */
	NotNull(): this {
		this.field.allowNull = false;
		return this;
	}

	/**
	 * Sets the field as unique.
	 * @returns The FieldFactoryBuilder instance.
	 */
	Unique(): this {
		this.field.unique = true;
		return this;
	}

	/**
	 * Sets references to other models for the field.
	 * @param options - Options for the references (e.g., model, key).
	 * @returns The FieldFactoryBuilder instance.
	 */
	References({ model, key }: ReferencesType): this {
		this.field.references = { model, key };
		return this;
	}

	/**
	 * Builds and returns the configured field.
	 * @returns The configured field.
	 */
	Build(): SingleFieldFactoryInterface<T> {
		return { ...this.field };
	}
}
