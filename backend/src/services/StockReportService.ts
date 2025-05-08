import StockReportRepository from '../repositories/StockReportRepository';

export default class StockReportService {
  static async getTotalStockValue() {
    return await StockReportRepository.getTotalStockValue();
  }

  static async getTotalItemsSold() {
    return await StockReportRepository.getTotalItemsSold();
  }

  static async getTopMovedProducts(limit: number) {
    return await StockReportRepository.getTopMovedProducts(limit);
  }
}
