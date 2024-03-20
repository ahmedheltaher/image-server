import { Model, Sequelize } from 'sequelize';
import { configurations, loggers } from '../../core';

/**
 * Singleton class that manages the Sequelize connection to the database.
 */
export class SequelizeSingleton {
	private static instance: SequelizeSingleton;

	/**
	 * The Sequelize instance.
	 */
	private _sequelize: Sequelize;

	public get connectionDetails(): Sequelize {
		return this._sequelize;
	}

	/**
	 * Private constructor.
	 */
	private constructor() {
		this._sequelize = new Sequelize({
			dialect: configurations.database.databaseType,
			host: configurations.database.host,
			database: configurations.database.database,
			username: configurations.database.username,
			password: configurations.database.password,
			port: configurations.database.port,
			pool: { max: 20, min: 0, acquire: 30_000, idle: 10_000 },
			logging: (message: string, timing?: number) =>
				loggers.database.debug(`Executed query: \`${message}\`: (took ${timing} ms)`),
			benchmark: true,
		});
	}

	/**
	 * Get the SequelizeConnection instance.
	 */
	public static getInstance(): SequelizeSingleton {
		if (!SequelizeSingleton.instance) {
			SequelizeSingleton.instance = new SequelizeSingleton();
		}
		return SequelizeSingleton.instance;
	}

	/**
	 * Sync a Sequelize model.
	 */
	private async syncModel(model: typeof Model, force: boolean) {
		try {
			await model.sync({ force });
			loggers.database.info(`Synced ${model.name} successfully`);
		} catch (error: any) {
			loggers.database.error(`Error syncing ${model.name}: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Sync all models.
	 */
	private async initializeModels(force: boolean) {
		const models = this.connectionDetails.modelManager.models;

		for (const model of models) {
			await this.syncModel(model, force);
		}

		loggers.database.info(`Models Count: ${models.length}`);
	}

	/**
	 * Sync the database.
	 */
	async sync() {
		try {
			await this.connectionDetails.sync({});
			await this.initializeModels(configurations.database.force);
		} catch (error) {
			loggers.database.error(error);
			process.exit(1);
		}
	}

	/**
	 * Close the connection to the database.
	 * @returns A promise that resolves once the connection is closed.
	 * */
	public static async close(): Promise<void> {
		if (SequelizeSingleton.instance) {
			await SequelizeSingleton.instance.connectionDetails.close();
			loggers.database.info('Connection to the database closed.');
		}
	}
}
