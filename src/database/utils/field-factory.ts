import { AbstractDataTypeConstructor, DataTypes, Sequelize } from 'sequelize';
import { FieldFactoryBuilder } from './field-factory-builder';
import { ToArrayOfValues, generateUUID } from './helper-functions';


/**
 * Interface representing the basic configuration for creating a database table.
 */
interface BasicModelConfigInterface {
	sequelize: Sequelize;
	timestamps?: boolean;
	paranoid?: boolean;
	tableName: string;
}


/**
 * Factory class for creating database table fields.
 */
export class FieldFactory {
	/**
	 * Creates basic model configuration for defining a database table.
	 * @param options - Options for basic model configuration.
	 * @returns Basic model configuration.
	 */
	static BasicModelConfig({
		sequelize,
		tableName,
		timestamps = false,
		paranoid = false,
	}: BasicModelConfigInterface): BasicModelConfigInterface {
		return { sequelize, timestamps, paranoid, tableName };
	}

	/**
	 * Creates a primary key field with auto-increment.
	 * @returns FieldFactoryBuilder instance for configuring the primary key field.
	 */
	static Id() {
		return FieldFactoryBuilder.create<number>(DataTypes.INTEGER).PrimaryKey({ autoIncrement: true });
	}

	/**
	 * Creates a UUID field with a generated default value.
	 * @returns FieldFactoryBuilder instance for configuring the UUID field.
	 */
	static UUId() {
		return FieldFactoryBuilder.create<string>(DataTypes.STRING).PrimaryKey({}).DefaultValue(generateUUID);
	}

	/**
	 * Creates an enum field.
	 * @param targetedEnum - Enum values.
	 * @returns FieldFactoryBuilder instance for configuring the enum field.
	 */
	static Enum<T extends Record<string, any>>(targetedEnum: T) {
		return FieldFactoryBuilder.create<T[]>(
			DataTypes.ENUM(...ToArrayOfValues(targetedEnum)) as unknown as AbstractDataTypeConstructor
		);
	}

	/**
	 * Creates a string field.
	 * @returns FieldFactoryBuilder instance for configuring the string field.
	 */
	static String() {
		return FieldFactoryBuilder.create<string>(DataTypes.STRING);
	}

	/**
	 * Creates a text field.
	 * @returns FieldFactoryBuilder instance for configuring the text field.
	 */
	static Text() {
		return FieldFactoryBuilder.create<string>(DataTypes.TEXT);
	}

	/**
	 * Creates a boolean field.
	 * @returns FieldFactoryBuilder instance for configuring the boolean field.
	 */
	static Boolean() {
		return FieldFactoryBuilder.create<boolean>(DataTypes.BOOLEAN);
	}

	/**
	 * Creates an integer field.
	 * @returns FieldFactoryBuilder instance for configuring the integer field.
	 */
	static Integer() {
		return FieldFactoryBuilder.create<number>(DataTypes.INTEGER);
	}

	/**
	 * Creates a decimal field.
	 * @returns FieldFactoryBuilder instance for configuring the decimal field.
	 */
	static Decimal() {
		return FieldFactoryBuilder.create<number>(DataTypes.DECIMAL);
	}

	/**
	 * Creates a date field.
	 * @returns FieldFactoryBuilder instance for configuring the date field.
	 */
	static Date() {
		return FieldFactoryBuilder.create<Date>(DataTypes.DATE);
	}

	/**
	 * Creates a time field.
	 * @returns FieldFactoryBuilder instance for configuring the time field.
	 */
	static Time() {
		return FieldFactoryBuilder.create<string>(DataTypes.TIME);
	}
}
