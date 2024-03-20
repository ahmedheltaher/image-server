const fs = require('fs').promises;

/**
 * Creates folder structure at the specified path.
 * @param {string} folderPath - The path where folder structure will be created.
 * @returns {Promise<void>} - A promise that resolves once the folder structure is created.
 */
async function createFolderStructure(folderPath) {
	try {
		await fs.mkdir(folderPath, { recursive: true });
		console.info(`Folder structure created successfully at ${folderPath}!`);
	} catch (error) {
		console.error(`Error creating folder structure at ${folderPath}:`, error);
	}
}

/**
 * Main function that orchestrates the initialization process.
 */
async function main() {
	// Create folder structure for logs
	await createFolderStructure('logs/archive');
}

// Run the main function and handle any errors
main().catch((error) => {
	console.error('An error occurred:', error);
});
