import { StockMovement } from '../models/StockMovement';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

export class StockMovementRepository {
  async create(data: Partial<StockMovement>) {
    return await StockMovement.create(data);
  }

  async findByPeriod(startDate: Date, endDate: Date) {
    return await StockMovement.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
  }

  // async findMostMovedProducts() {
  //   return await StockMovement.findAll({
  //     attributes: ['productId', [sequelize.fn('COUNT', 'productId'), 'count']],
  //     group: ['productId'],
  //     order: [[sequelize.literal('count'), 'DESC']],
  //     limit: 5,
  //   });
  // }
}
