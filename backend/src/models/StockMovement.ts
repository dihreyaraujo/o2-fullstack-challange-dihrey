// backend/src/models/StockMovement.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Product } from './Product';

export class StockMovement extends Model {}

StockMovement.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  }

}, {
  sequelize,
  modelName: 'StockMovement',
  tableName: 'stock_movements',
  timestamps: true,
});

Product.hasMany(StockMovement, { foreignKey: 'productId' });
StockMovement.belongsTo(Product, { foreignKey: 'productId' });
