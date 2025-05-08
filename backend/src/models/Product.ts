import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Product extends Model {
  id!: number;
  name!: string;
  description!: string;
  quantity!: number;
  price!: number;
  category!: string;
}

Product.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true,
});
