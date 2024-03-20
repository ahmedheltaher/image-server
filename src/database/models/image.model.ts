import { Model, Optional } from 'sequelize';
import { SequelizeSingleton } from '../server';
import { FieldFactory, IDates, JSONSerializer } from '../utils';

interface ImageAttributes {
	id: string;
	filePath: string;
}
export interface ImageInput
	extends Optional<ImageAttributes, 'id'>,
		Optional<IDates, 'createdAt' | 'deletedAt' | 'updatedAt'> {}

export class Image extends Model<ImageAttributes, ImageInput> implements ImageAttributes {
	declare id: string;
	declare filePath: string;

	toJSON() {
		return this.jsonSerializer.toJSON({ modelInstance: this.dataValues, keysToDelete: ['createdAt', 'updatedAt'] });
	}

	private jsonSerializer = new JSONSerializer<ImageAttributes>();
}

Image.init(
	{
		id: FieldFactory.UUId().Build(),
		filePath: FieldFactory.String().NotNull().Build(),
	},
	{
		...FieldFactory.BasicModelConfig({
			sequelize: SequelizeSingleton.getInstance().connectionDetails,
			tableName: 'images',
			timestamps: true,
		}),
		indexes: [{ unique: true, fields: [{ name: 'id' }] }],
	}
);
