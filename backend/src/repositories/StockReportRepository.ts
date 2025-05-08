// backend/src/repositories/StockReportRepository.ts
import { Product } from '../models/Product';
import { StockMovement } from '../models/StockMovement';
import { Op, fn, col, literal } from 'sequelize';

export default class StockReportRepository {
  static async getTotalStockValue() {
    const result = await Product.findAll({
      attributes: [[fn('SUM', literal('"quantity" * "price"')), 'totalValue']],
      raw: true,
    }) as unknown as { totalValue: string }[];
  
    return Number(result[0]?.totalValue || 0);
  }
  
  static async getTotalItemsSold() {
    const result = await StockMovement.findAll({
      where: { type: 'saida' },
      attributes: [[fn('SUM', col('quantity')), 'totalItemsSold']],
      raw: true,
    }) as unknown as { totalItemsSold: string }[];
  
    return Number(result[0]?.totalItemsSold || 0);
  }
  

  static async getTopMovedProducts(limit: number) {
    const result = await StockMovement.findAll({
      attributes: [
        'productId',
        [fn('SUM', col('quantity')), 'totalMoved']
      ],
      group: ['productId'],
      order: [[fn('SUM', col('quantity')), 'DESC']], // Corrigido aqui
      limit,
      raw: true,
    }) as unknown as { productId: string, totalMoved: string }[];
  
    const productIds = result.map((r: any) => r.productId);
    const products = await Product.findAll({ where: { id: productIds }, raw: true });
  
    return result.map((r: any) => {
      const product = products.find(p => p.id === r.productId);
      return {
        productId: r.productId,
        name: product?.name,
        totalMoved: Number(r.totalMoved),
      };
    });
  }
}
