import { ProductRepository } from '../repositories/ProductRepository';
import { ProductService } from '../services/ProductService';

export const makeProductService = () => {
  const repo = new ProductRepository();
  return new ProductService(repo);
};
