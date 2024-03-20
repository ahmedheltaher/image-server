import * as dotenv from 'dotenv';
import { Level } from 'pino';
import { Dialect } from 'sequelize';

// Load environment variables from .env file
const config = dotenv.config();

if (config.error) {
	throw new Error(`Error loading environment variables from.env file it must be located in the root of the project.`);
}

/**
 * Parses an environment variable as an integer, returning a default value if parsing fails.
 * @param key - The name of the environment variable to parse.
 * @param defaultValue - The default value to return if parsing fails.
 * @returns The parsed integer value of the environment variable, or the default value if parsing failed.
 */
function parseEnvironmentInteger(key: string, defaultValue: number): number {
	const value = process.env[key];
	if (value === undefined) return defaultValue;
	const parsedValue = parseInt(value, 10);
	return isNaN(parsedValue) ? defaultValue : parsedValue;
}

/**
 * Parses an environment variable as a boolean, returning a default value if parsing fails.
 * @param key - The name of the environment variable to parse.
 * @param defaultValue - The default value to return if parsing fails.
 * @returns The parsed boolean value of the environment variable, or the default value if parsing failed.
 */
function parseEnvironmentBoolean(key: string, defaultValue: boolean): boolean {
	const value = process.env[key]?.toLowerCase();
	return value === 'true' ? true : value === 'false' ? false : defaultValue;
}

/**
 * Parses an environment variable as a string, returning a default value if parsing fails.
 * @param key - The name of the environment variable to parse.
 * @param defaultValue - The default value to return if parsing fails.
 * @returns The parsed string value of the environment variable, or the default value if parsing failed.
 */
function parseEnvironmentString(key: string, defaultValue: string): string {
	return process.env[key] || defaultValue;
}

// Ensure required environment variables are defined
const requiredEnvironmentVariables = [
	'JWT_SECRET',
	'DATABASE_NAME',
	'DATABASE_USER',
	'DATABASE_PASSWORD',
	'DATABASE_HOST',
	'DATABASE_PORT',
];
for (const requiredVar of requiredEnvironmentVariables) {
	if (!(requiredVar in process.env)) {
		throw new Error(`Required environment variable ${requiredVar} is not defined`);
	}
}

type Environment = 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';

export const configurations = {
	server: {
		port: parseEnvironmentInteger('SERVER_PORT', 3000),
		host: parseEnvironmentString('SERVER_HOST', '127.0.0.1'),
		// TODO: Add support for CORS
		// cors: {
		// 	enabled: process.env.CORS_ENABLED === 'true',
		// 	allowedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(',') || [],
		// }
		// TODO: Add support for https
		// https: {
		// enabled: process.env.HTTPS_ENABLED === 'true',
		// port: parseEnvironmentInteger('HTTPS_PORT', 443),
		// key: process.env.HTTPS_KEY || '',
		// cert: process.env.HTTPS_CERT || '',
		// },
	},

	logging: {
		level: parseEnvironmentString('LOGGING_LEVEL', 'trace') as Level,
		rotation: {
			enabled: parseEnvironmentBoolean('LOGGING_ROTATION_ENABLED', false),
			fileSize: parseEnvironmentInteger('LOGGING_ROTATION_FILE_SIZE', 1024 * 1024 * 10), // Default 10MB
		},
	},

	database: {
		databaseType: parseEnvironmentString('DATABASE_TYPE', 'postgres') as Dialect,
		database: parseEnvironmentString('DATABASE_NAME', ''),
		password: parseEnvironmentString('DATABASE_PASSWORD', ''),
		host: parseEnvironmentString('DATABASE_HOST', ''),
		username: parseEnvironmentString('DATABASE_USER', ''),
		port: parseEnvironmentInteger('DATABASE_PORT', 1433),
		force: parseEnvironmentBoolean('DATABASE_FORCE_SYNC', false),
	},

	jwt: {
		secret: parseEnvironmentString('JWT_SECRET', ''),
		tokenDuration: {
			long: parseEnvironmentInteger('JWT_TOKEN_DURATION_LONG', 60 * 60 * 24 * 30), // 30 Days Validity
			short: parseEnvironmentInteger('JWT_TOKEN_DURATION_LONG', 60 * 60 * 24), // 1 Day Validity
		},
	},

	api: {
		prefix: parseEnvironmentString('API_PREFIX', '/api'),
	},

	redis: {
		host: parseEnvironmentString('REDIS_HOST', 'localhost'),
		port: parseEnvironmentInteger('REDIS_PORT', 6379),
	},

	bcrypt: { saltOrRounds: parseEnvironmentInteger('BCRYPT_SALT_OR_ROUNDS', 10) },

	getEnvironmentType(): Environment {
		const nodeEnv = parseEnvironmentString('NODE_ENV', 'DEVELOPMENT').toUpperCase();
		if (nodeEnv === 'DEVELOPMENT') return 'DEVELOPMENT';
		if (nodeEnv === 'STAGING') return 'STAGING';
		if (nodeEnv === 'PRODUCTION') return 'PRODUCTION';
		throw new Error('Invalid NODE_ENV value');
	},
};
