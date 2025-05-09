import { StockMovement } from '../models/StockMovement';
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

  async findAll() {
    return await StockMovement.findAll();
  }
}
