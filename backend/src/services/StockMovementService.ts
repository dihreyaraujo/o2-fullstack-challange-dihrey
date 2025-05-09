import { StockMovementRepository } from '../repositories/StockMovementRepository';
import { ProductRepository } from '../repositories/ProductRepository';

export class StockMovementService {
  constructor(
    private movementRepo: StockMovementRepository,
    private productRepo: ProductRepository
  ) {}

  async create(data: any) {
    const { productId, type, quantity } = data;
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error('Produto não encontrado');

    const qty = Number(quantity);
    if (type === 'entrada') {
      await product.update({ quantity: product.quantity + qty });
    } else if (type === 'saida') {
      if (product.quantity < qty) throw new Error('Estoque insuficiente');
      await product.update({ quantity: product.quantity - qty });
    }

    return await this.movementRepo.create(data);
  }

  getByPeriod(startDate: Date, endDate: Date) {
    return this.movementRepo.findByPeriod(startDate, endDate);
  }
}
