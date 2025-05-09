import { Request, Response } from 'express';
import { makeStockMovementService } from '../factories/StockMovementFactory';

const service = makeStockMovementService();

export const StockMovementController = {
  async create(req: Request, res: Response) {
    try {
      const movement = await service.create(req.body);
      res.status(201).json(movement);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async reportMovements(req: Request, res: Response) {
    const { start, end } = req.query;
    if (!start || !end) {
      const dataAll = await service.getAll();
      res.status(200).json(dataAll);
    } else {
      const data = await service.getByPeriod(new Date(start as string), new Date(end as string));
      res.status(200).json(data);
    }
  }
};
