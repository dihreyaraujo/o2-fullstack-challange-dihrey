import { StockMovementRepository } from '../repositories/StockMovementRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { StockMovementService } from '../services/StockMovementService';

export const makeStockMovementService = () => {
  const movementRepo = new StockMovementRepository();
  const productRepo = new ProductRepository();
  return new StockMovementService(movementRepo, productRepo);
};
