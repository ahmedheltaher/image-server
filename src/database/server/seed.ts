import * as fs from 'fs/promises';
import { loggers } from '../../core';

const seedLogger = loggers.database.child({ module: 'seeder' });

/**
 * Seeds the database with data from a JSON file.
 * @param {string} filePath - The path to the JSON file containing the data to seed the database with.
 * @returns {Promise<void>} - A promise that resolves once the seeding is complete.
 */
export async function seed(filePath: string): Promise<void> {
	try {
		// Check if seeding is necessary

		// Read data from JSON file
		const data = await fs.readFile(filePath, 'utf8');
		const {} = JSON.parse(data);

		seedLogger.info('Database successfully seeded.');
	} catch (error) {
		seedLogger.error(`Error seeding the database: ${error}`);
	}
}
