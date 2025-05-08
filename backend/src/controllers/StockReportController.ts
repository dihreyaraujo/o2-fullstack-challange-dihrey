import { Request, Response } from 'express';
import StockReportService from '../services/StockReportService';

export default class StockReportController {
  static async totalStockValue(req: Request, res: Response) {
    const total = await StockReportService.getTotalStockValue();
    res.json({ totalValue: Number(total) });
  }

  static async totalItemsSold(req: Request, res: Response) {
    const total = await StockReportService.getTotalItemsSold();
    res.json({ totalItemsSold: Number(total) });
  }

  static async topMovedProducts(req: Request, res: Response) {
    const limit = Number(req.query.limit) || 5;
    const products = await StockReportService.getTopMovedProducts(limit);
    res.json(products);
  }
}
