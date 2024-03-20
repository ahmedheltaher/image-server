import { Sequelize, Transaction } from 'sequelize';
import { loggers } from '../../core';

/**
 * Manages database transactions for a Sequelize connection.
 */
export class TransactionManager {
	private openTransactions: Transaction[] = [];

	/**
	 * Constructs a new TransactionManager instance.
	 * @param sequelizeConnection The Sequelize connection instance to manage transactions for.
	 */
	constructor(private sequelizeConnection: Sequelize) {}

	/**
	 * Starts a new transaction.
	 * @returns A Promise that resolves with the started transaction.
	 */
	public async startTransaction(): Promise<Transaction> {
		const transaction = await this.sequelizeConnection.transaction();
		this.openTransactions.push(transaction);
		return transaction;
	}

	/**
	 * Commits a transaction.
	 * @param transaction The transaction to commit.
	 * @returns A Promise that resolves when the transaction is successfully committed.
	 * @throws If an error occurs during the commit process.
	 */
	public async commitTransaction(transaction: Transaction): Promise<void> {
		try {
			await transaction.commit();
			this.removeTransaction(transaction);
		} catch (error) {
			loggers.exceptions.error(`Error committing transaction: ${error}`);
			throw error;
		}
	}

	/**
	 * Rolls back a transaction.
	 * @param transaction The transaction to roll back.
	 * @returns A Promise that resolves when the transaction is successfully rolled back.
	 * @throws If an error occurs during the rollback process.
	 */
	public async rollbackTransaction(transaction: Transaction): Promise<void> {
		try {
			await transaction.rollback();
			this.removeTransaction(transaction);
		} catch (error) {
			loggers.exceptions.error(`Error rolling back transaction: ${error}`);
			throw error;
		}
	}

	/**
	 * Removes a transaction from the list of open transactions.
	 * @param transaction The transaction to remove.
	 */
	private removeTransaction(transaction: Transaction): void {
		const index = this.openTransactions.indexOf(transaction);
		if (index !== -1) {
			this.openTransactions.splice(index, 1);
		}
	}
}
