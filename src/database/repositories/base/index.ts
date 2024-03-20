import { CreateOptions, DestroyOptions, FindOptions, Model, ModelStatic, UpdateOptions } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

type CreationAttributes<M extends Model> = MakeNullishOptional<M['_creationAttributes']>;

interface BaseRepositoryInterface<M extends Model, I extends CreationAttributes<M>> {
	findAll(options?: FindOptions): Promise<Array<M>>;
	findOne(options: FindOptions): Promise<M | null>;
	create(entity: I, options?: CreateOptions<M>): Promise<M>;
	bulkCreate(entities: Array<I>, options?: CreateOptions<M>): Promise<Array<M>>;
	update(entity: Partial<I>, options?: UpdateOptions<M>): Promise<[affectedCount: number, affectedRows: Array<M>]>;
	delete(options?: DestroyOptions<M>): Promise<number>;
}

export class BaseRepository<M extends Model, I extends CreationAttributes<M>> implements BaseRepositoryInterface<M, I> {
	/**
	 * The maximum value that PostgreSQL can handle is (2^63 - 1), but JavaScript behaves differently due to its use of double-precision floating-point format (IEEE 754).
	 * When working with bigInt, it correctly handles large numbers, but converting them back to numbers may result in unexpected behavior.
	 * JavaScript may produce a larger number by 192, and subtracting from it might not affect the last three digits as expected.
	 */
	private POSTGRESQL_MAX_BIG_INT = 2 ** 63 - 1000;
	constructor(private model: ModelStatic<M>) {}

	public async findAll(options?: FindOptions<M>): Promise<Array<M>> {
		if (options?.offset && options.offset > 0)
			options.offset = Math.min(options.offset, this.POSTGRESQL_MAX_BIG_INT);
		if (options?.limit && options.limit > 0) options.limit = Math.min(options.limit, this.POSTGRESQL_MAX_BIG_INT);

		return this.model.findAll(options);
	}

	public async findOne(options: FindOptions<M>): Promise<M | null> {
		if (options?.offset && options.offset > 0)
			options.offset = Math.min(options.offset, this.POSTGRESQL_MAX_BIG_INT);
		if (options?.limit && options.limit > 0) options.limit = Math.min(options.limit, this.POSTGRESQL_MAX_BIG_INT);

		return await this.model.findOne(options);
	}

	public async create(entity: I, options?: CreateOptions<M>): Promise<M> {
		return this.model.create(entity, options);
	}

	public async bulkCreate(entities: Array<I>, options?: CreateOptions<M>): Promise<Array<M>> {
		return this.model.bulkCreate(entities, options);
	}
	public async update(
		entity: Partial<I>,
		options: UpdateOptions<M> = { where: {} }
	): Promise<[affectedCount: number, affectedRows: Array<M>]> {
		if (options?.limit && options.limit > 0) options.limit = Math.min(options.limit, this.POSTGRESQL_MAX_BIG_INT);

		return await this.model.update(entity, { ...options, returning: true });
	}

	public async delete(options?: DestroyOptions<M>): Promise<number> {
		if (options?.limit && options.limit > 0) options.limit = Math.min(options.limit, this.POSTGRESQL_MAX_BIG_INT);

		return await this.model.destroy(options);
	}

}
